import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Ticket3 } from '../interface/ticket-interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.component.html',
  styleUrl: './ticket-detalle.component.scss'
})
export class TicketDetalleComponent implements OnInit{
  ticketId: any;
  tickets : Ticket3 | undefined
  private unsubscribe$ = new Subject<void>();
  loading: boolean = false;
  porTrabajar:any
  user: any; // el usuario actual
  visible: boolean = false;
  aceptTicket:boolean = false; // cuando acepta el ticket 
  comentarios2: FormControl; // es para comentarios al cerrar el ticket
  solucionado:boolean;
  visibleFinish:boolean  = false;


  constructor (private ticketService:TicketsServiceService, private activatedRoute:ActivatedRoute, private authService:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private route:Router, 
  ) {     this.comentarios2 = new FormControl('');
  }

  ngOnInit(): void {


    this.user = this.authService.getUser()
    this.ticketId = this.activatedRoute.snapshot.paramMap.get('id');
    this.porTrabajar = this.activatedRoute.snapshot.paramMap.get('T');
    this.getTicketsForId()

    // if(this.tickets.estatus === 'abierto'){

    // }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTicketsForId2(): void {
    this.ticketService.getTicketsForId(this.ticketId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.tickets = res;
        this.loading = false

        // console.log(this.tickets?.area);
      });
  }
  getTicketsForId(){
    this.ticketService.getTicketForId(this.ticketId).subscribe((res)=>{
      this.tickets = res 
      this.loading = true;
      // console.log(this.tickets)
      // this.getUsuarioForArea()

})
  }

  getSeverity(estatus){
    switch (estatus) {
      case 'abierto':
          return 'success';
      case 'en progreso':
          return 'warning';
      case 'cerrado':
          return 'alert';
          default:
          return 'default'; // O cualquier otro valor por defecto que desees
  }
  }

  //selecciona el ticket para que cambie el estatus a proceso y para el campo de trabajadoPor
  selectTicket(){ 
    this.ticketService.putTicket(this.ticketId,this.user.usuario).subscribe((res)=>{
      this.ticketService.putTicketEstatus(this.ticketId,'en progreso').subscribe()
    })
  }


  confirm1(event: Event, ticket:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro(a) que quieres aceptar el ticket?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'has aceptado el ticket ', life: 3000 });
            this.selectTicket()
            this.getTicketsForId()
            //todo se colocara para enviar notificacion
            this.sendNotification(ticket);
            this.aceptlocationTicket(this.ticketId)

            this.getUsuarioForArea()
        },
        reject: () => {
          return;

        }
    });
}
sendNotification(ticket?){
  // se enviara notificacion a la persona , cuando acepte el ticket ese ticket aceptado se le enviara a la persona que lo mando 

  // console.log(this.tickets)
  const data = {
    user_id: ticket.usuarioId,
    usuario: ticket.nombre_usuario,
    message: `tu ticket a sido tomado por ${this.user.nombre}` ,
    tipo:2,
  }

  // console.log(data)
  //todo ver porque no sale el data los datos

  this.ticketService.addNotification(data).subscribe(()=>{


  })


}

confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Seguro(a) que quieres rechazar el ticket?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Rechazado', detail: 'Has rechazado el ticket', life: 3000 });

      },
      reject: () => {
        return;
      }
  });
}

look(value, id){ // se recibe 0 si no se soluciono y 1 si si se soluciono 
  // console.log(id)
  // this.idDetalleTicket = id 
  this.visible = true;
  if(value){
    this.solucionado = true;
  }else{
    this.solucionado = false;
  }
}

aceptlocationTicket(idTicket){
  // enviara a la otra pagina diciendo que acepto el ticket
  // console.log('navegando al ticket de aceptacion', idTicket)
  this.route.navigate(['tickets/crearTicket/ticketAceptado', idTicket])

}

// es para decir si se soluciono el ticket o no y enviar comentarios 2
onSubmit(){

  // console.log(this.tickets)
  // return;
  this.visibleFinish = true
  // console.log(this.comentarios2.value)
  if(this.comentarios2.valid){

    const data = {
      id:this.tickets.detalleId, // debe ir el id de la tabla y no el id del ticket (resolver)
      comentario2 : this.comentarios2.value,
      solucionado :this.solucionado
    }
    this.ticketService.putTicketCerrar(data.id,data.comentario2,data.solucionado).subscribe((res)=>{
      // console.log(res)
      // location.reload();
    })
  }

}

goInicio(){
  this.route.navigateByUrl('/tickets')
}

getUsuarioForArea(){
// es para ver los usuaros del mismo area que no aceptaron el ticket para que se les envie notificacion
  let area = this.tickets?.paraAreaDe;
  let usuariosArea = []
  console.log(this.tickets)

  this.ticketService.getusuariosForArea(area).subscribe((res)=>{
    usuariosArea = res.map((usuario) => usuario.usuario);

   let  usuarios = usuariosArea.filter((usuario) => usuario !== this.tickets?.trabajadoPor);

   this.addNotification2(usuarios)

  })
  //sera otra notificacion que se les notificara cuando uno del mismo area ya alla aceptado el ticket

}


addNotification2(usuarios){
  //para enviar notificacion cuando alguien lo acepte , se les envie a los que no aceptaron del mismo area
  usuarios.forEach((usuario) => {

  let data = {
    user_id: '31',
    usuario: usuario,
    message: `el ticket con el id ${this.ticketId} ha sido aceptado por el usuario  ${this.user.usuario}`,
    tipo: 4,
    
  }

  this.ticketService.addNotification(data).subscribe(()=>{

  })

})

}




}