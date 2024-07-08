import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { tickets } from 'src/app/demo/interfaces/interfacesLocales';
import { AuthService } from '../../../auth/auth.service';
import { delay } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-tickets-seleccionados',
  templateUrl: './tickets-seleccionados.component.html',
  styleUrl: './tickets-seleccionados.component.scss'
})
export class TicketsSeleccionadosComponent implements OnInit {
  estatus: { name: string; code: string; }[];
  selectedCity:any | undefined;
  filteredTickets: tickets[];

  constructor (private ticketsService:TicketsServiceService, private authService:AuthService, private fb: FormBuilder) { }
  ticketForm: FormGroup;

  messages: { severity: string; detail: string; }[];
  visible2: boolean = false;
  fechaHoy: string;
  searchTerm:string = '';
  selectedStatus = '';

user : any
trabajadoPor : string = ''
tickets:tickets[] = [] // tickets todos
alert:boolean = false;
loading:boolean = true;
visible = false; // es para que se vea los detalles del ticket en un pop
ticket:any; // ticket individual

  ngOnInit(): void {

    this.estatus = [
      { name: 'en progreso', code: 'NY' },
      { name: 'terminado', code: 'RM' },
      { name: 'cerrado', code: 'LDN' },
      { name: 'todos', code: 'LDN' },
  ];



    this.ticketForm = this.fb.group({
      idTicket: ['', Validators.required],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
      fechaFin: ['', Validators.required]
    });
    this.user = this.authService.getUser()
    this.trabajadoPor = this.user.usuario
    
    this.ticketSeleccionados()

    this.messages = [
      {severity:'info', detail:'Aun no has seleccionado tickets por trabajar'}
    ]

    const hoy = new Date();
    this.fechaHoy = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  getSeverity(estatus){
    switch (estatus) {
      case 'abierto':
          return 'success';
      case 'en progreso':
          return 'warning';
      case 'terminado':
          return 'success';
      case 'cerrado':
          return 'alert';
          default:
          return 'default'; // O cualquier otro valor por defecto que desees
  }
  }

  ticketSeleccionados(){

    this.ticketsService.getTrabajadoPor(this.trabajadoPor).pipe(
      delay(500),
    ).subscribe((res)=>{
      if (Array.isArray(res)) {
        this.tickets = res;
        this.filterTickets()
        // console.log('tickets',this.tickets)
      } else if (res && typeof res === 'object') {
        this.tickets = []  // Con
        this.alert = true;
    }
    this.loading = false;
    return;
  })

  }

  showDialog(id){

    this.ticketsService.getTicketForId(id).subscribe((res)=>{
      this.ticket = res
      console.log('ticket individual',this.ticket)
    })
    this.visible = true;

    this.ticketForm.patchValue({idTicket:id});
    this.ticketForm.patchValue({fechaFin:this.fechaHoy});


  }

  openComment(){
    this.visible2 = true;
  }


  onSubmit(){
    //esta funcion es para enviar los datos de detalles el ticket cuando se termina el ticket
    location.reload() // refrescar pagina
    if(this.ticketForm.valid){
      
      this.ticketsService.postTicketDetalle(this.ticketForm.value).subscribe((res)=>{
        
        if(res){
        const ticketIdValue = this.ticketForm.get('idTicket').value;

        this.ticketsService.putTicketEstatus(ticketIdValue, 'terminado').subscribe()
        }
      })

    }
  }


  filterEvent(event:any){
    this.filterTickets()
  }
 
  filterTickets() {
    if (this.selectedStatus) {
      this.filteredTickets = this.tickets.filter(ticket => ticket.estatus === this.selectedStatus);

      if(this.selectedStatus === 'todos'){
        this.filteredTickets = this.tickets;
      }
    } else {
      this.filteredTickets = [...this.tickets];
    }
  }
}


