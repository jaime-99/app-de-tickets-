import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Ticket3 } from '../interface/ticket-interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { PerfilService } from '../../../editar-perfil/services/perfil.service';

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
  updateTickets: boolean = false;
  trabajadoPor: string; // es el usuaro de quien trabaja el ticket


  constructor (private ticketService:TicketsServiceService, private activatedRoute:ActivatedRoute, private authService:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private perfilService:PerfilService,
    private route:Router, 

  ) {     this.comentarios2 = new FormControl('sin comentarios'); }

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
      console.log(this.tickets.trabajadoPor) //todo checar por que no se ve
      this.trabajadoPor = this.tickets.trabajadoPor
      if(this.updateTickets) this.getUsuarioForArea();
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
  selectTicket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.ticketService.putTicket(this.ticketId, this.user.usuario).subscribe({
        next: (res) => {
          this.ticketService.putTicketEstatus(this.ticketId, 'en progreso').subscribe({
            next: () => {
              resolve(); // Resolver la promesa cuando ambas llamadas hayan finalizado
            },
            error: (err) => {
              reject(err); // Rechazar la promesa en caso de error
            }
          });
        },
        error: (err) => {
          reject(err); // Rechazar la promesa en caso de error
        }
      });
    });
  }
  


  confirm1(event: Event, ticket:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro(a) que quieres aceptar el ticket?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:"Si",
        accept: () => {
          
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'has aceptado el ticket ', life: 3000 });
            this.selectTicket().then(() => {
              this.updateTickets= true;
              this.getTicketsForId();
              // console.log('tickets actualizados con trabajadoPor',this.tickets)
              // return;
              this.sendNotification(ticket);
              this.sendEmail(ticket)
              this.aceptlocationTicket(this.ticketId);
          }).catch(error => {
              console.error("Error actualizando el ticket:", error);
          });


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

    // this.getUsuarioForArea() // ver si aqui se llama correcto
    // this.sendEmail(ticket)
  })
}

sendEmail(ticket?){
  //enviar correo cuando se acepte ticket a la persona del ticket

  const email = this.tickets.correo;
  console.log(this.tickets.trabajadoPor, 'linea 171')
  const data = {
    to:email,
    subject: 'Ticket ACEPTADO',
    body: `Hola el usuario - ${this.user.usuario} - ha aceptado su ticket con el numero id ${this.ticketId} 
    entra a https://plataformacgp.cgpgroup.mx para que veas el ticket actualizado `
  }

  this.ticketService.sendEmails(data).subscribe(()=>{
    
  })
  
}

confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Seguro(a) que quieres rechazar el ticket?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      acceptLabel:"Si",
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Rechazado', detail: 'Has rechazado el ticket', life: 3000 });
          //todo ver que pasa cuando lo rechaza

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
  // console.log(this.comentarios2.value)
  //todo pendiente, sin comentarios no se si se guarda pero sin el solucionado revisar , fecha 02/09/2024
  if(this.comentarios2.valid){
    this.visibleFinish = true

    const data = {
      id:this.tickets.idTicket, // debe ir el id de la tabla del detalleTicket y no el id del ticket (resolver)
      comentario2 : this.comentarios2.value,
      solucionado :this.solucionado
    }
    // console.log(data)
    this.ticketService.putTicketCerrar(data.id,data.comentario2,data.solucionado).subscribe((res)=>{
      // console.log(res)
      // location.reload();
      this.sendNotification6();
    })
  }else{
    console.log('es falso , el campo comentarios no esta')
    return;
  }
}
sendNotification6(){
  // es para mandar la notificacion de tipo 6
  const data = {
    user_id:this.tickets.usuarioId,
    usuario:this.tickets.trabajadoPor,
    message: `El ticket con el id ${this.tickets.id} del usuario ${this.tickets.nombre_usuario} ha sido CERRADO`,
    tipo: '6'
  }

  this.ticketService.addNotification(data).subscribe((res)=>{
    // console.log('notificacion tipo 6',res)
    this.putEstatusToCerrado(this.tickets?.id)

    this.perfilService.getEmailForUser(this.tickets.trabajadoPor).subscribe((res)=>{
      let correoUsuario = res
      console.log(correoUsuario)
      this.sendEmailCerrado(correoUsuario)
    })
  })
}

//se envia correo de cerrado a el usuario que mando el ticket 
sendEmailCerrado(correo){

  const data = {
    to : correo,
    subject: 'TICKET CERRADO',
    body: `el ticket con el id ${this.ticketId} ha sido cerrado por el usuario  ${this.tickets.nombre}`
  }

  this.ticketService.sendEmails(data).subscribe((res)=>{
    console.log('correo enviado cuando el ticket se cierra',res)
  })
}
putEstatusToCerrado(id){
  this.ticketService.putTicketEstatus(id, 'cerrado').subscribe((res)=>{
    // console.log(res)
  })
}

goInicio(){
  this.route.navigateByUrl('/tickets/crearTicket/misTickets')
}

getUsuarioForArea(){  
// es para ver los usuaros del mismo area que no aceptaron el ticket para que se les envie notificacion
this.updateTickets= false;
  let area = this.tickets?.paraAreaDe;
  let usuariosArea = []
  // console.log(this.tickets)
  // return;

  this.ticketService.getusuariosForArea(area).subscribe((res)=>{
    // usuariosArea = res.map((usuario) => usuario.usuario);
    let usuariosArea = res.map((usuario) => ({ usuario: usuario.usuario, id: usuario.id }));

    let usuarios = usuariosArea.filter((u) => u.usuario !== this.tickets?.trabajadoPor);


  //  let  usuarios = usuariosArea.filter((usuario) => usuario !== this.tickets?.trabajadoPor);
    // console.log(usuarios)

   this.addNotification2(usuarios)

  })
  //sera otra notificacion que se les notificara cuando uno del mismo area ya alla aceptado el ticket

}


addNotification2(usuarios:{usuario:string,id:number}[]){
  //para enviar notificacion cuando alguien lo acepte , se les envie a los que no aceptaron del mismo area
  usuarios.forEach((usuario) => {

  let data = {
    user_id: usuario.id, //todo pendiente ver que se mande tambien el id desde la funcion getUsuarioForArea() 
    usuario: usuario.usuario,
    message: `el ticket con el id ${this.ticketId} que se mando a su area de ${this.tickets.paraAreaDe} ha sido aceptado por el usuario  ${this.user.usuario}`,
    tipo: 4,
    
  }


  this.ticketService.addNotification(data).subscribe((res)=>{
    // console.log('aviso para enviar a los que no aceptaron el ticket')
  })

})

}

exportToPDF(){
  const printContent = document.getElementById('print-section');
  const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
  if (printContent && WindowPrt) {
      WindowPrt.document.write(`
          <html>
              <head>  
                  <title>informacion de ticket</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          margin: 20px;
                      }
                      ul {
                          list-style-type: none;
                          padding: 0;
                      }
                      li {
                          margin-bottom: 10px;
                      }
                  </style>
              </head>
              <body>
                  ${printContent.innerHTML}
              </body>
          </html>
      `);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
  }
}



}