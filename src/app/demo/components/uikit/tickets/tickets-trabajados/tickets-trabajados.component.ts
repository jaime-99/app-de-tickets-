import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { tickets } from 'src/app/demo/interfaces/interfacesLocales';
import { AuthService } from '../../../auth/auth.service';
import { usuario } from '../../../auth/interfaces/usuario.interface';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tickets-trabajados',
  templateUrl: './tickets-trabajados.component.html',
  styleUrl: './tickets-trabajados.component.scss'
})
export class TicketsTrabajadosComponent implements OnInit {
  messages: { severity: string; detail: string; }[];
  tabs: { title: string; content: string; }[];

  constructor ( private ticketsService:TicketsServiceService, private authServcie: AuthService,  private route: Router ) { }
  areas : any;
  tickets:tickets[]
  para_area : any;
  user:usuario; //agregar tipo
  loading:boolean = true ;
  alert:boolean = false; // es cuando no haya ningun tipo de ticket
  porTrabajar = 1; // si es 1 es que se ira con el parametro de que puede seleccionar para trabajarlo

  searchTerm: string = ''; // para buscar

  ngOnInit(): void {

    this.tabs = [
      { title: 'Todos', content: 'Tab 1 Content' },
      { title: 'Abierto', content: 'Tab 2 Content' },
      { title: 'En progreso', content: 'Tab 3 Content' },
      { title: 'Terminado', content: 'Tab 3 Content' }
  ];

    this.user = this.authServcie.getUser()
    this.getAreas()

    this.messages = [
      {severity:'info', detail:'Nadie te ha enviado tickets hasta el momento'}
    ]

  }

  getAreas(){
    this.ticketsService.getAreas().subscribe((res)=>{
      this.areas = res
      this.whatAreaIs(this.user.area)
    })

  }
  whatAreaIs(idArea){

    switch (idArea) {
      case 'Sistemas':
        this.para_area = 1;
        break;
      case 'Comercial':
        this.para_area = 2;
        break;
      case 'Administracion':
        this.para_area = 3;
        break;
      case 'Diseno':
        this.para_area = 4;
        break;
      case 'RH':
        this.para_area = 5;
        break;
      case 'Materiales':
        this.para_area = 6;
        break;
      default:
        this.para_area = 0;
        break;
    }    
    this.getTickets()
  }


  // getTickets(){
  //   this.ticketsService.getTicketForAreaId(this.para_area).subscribe((res)=>{
  //     this.tickets = res
  //     this.loading = false;
  //     if(!this.tickets){
  //       this.alert = true;
  //     }
  //     console.log(this.tickets)
  //   })
  // }
  getTickets() {
    this.ticketsService.getTicketForAreaId(this.para_area).subscribe((res) => {
      // console.log(res);  // Verificar la estructura de la respuesta
      if (Array.isArray(res)) {
        this.tickets = res;
      } else if (res && typeof res === 'object') {
        this.tickets = Object.values(res);  // Convertir el objeto en un array de valores
        // console.log('no tiene nada')
        this.alert = true;
      } else {
        this.tickets = [];
      }
      this.loading = false;
      if (!this.tickets.length) {
      }
      // console.log(this.tickets);  // Verificar el array transformado
    });
  }

  ticketsByEstatus(status?){
    if(!status){
      return this.tickets;
    }
    // console.log(status)
    // const ticketsFilter = (this.tickets.filter(ticket => ticket.estatus === status));
    // console.log(this.tickets)
    return this.tickets.filter(ticket => ticket.estatus === status);
  }
  

  redirectTo(id){
    this.route.navigate(['./tickets/crearTicket/', id, this.porTrabajar])
  }

  getSeverity(estatus){
    switch (estatus) {
      case 'abierto':
          return 'success';
      case 'en progreso':
          return 'warning';
      case 'cerrado':
          return 'danger';
          default:
          return 'default'; // O cualquier otro valor por defecto que desees
  }
  }
}
