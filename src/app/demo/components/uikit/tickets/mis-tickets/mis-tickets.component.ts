import { Component, OnInit } from '@angular/core';
import { tickets } from 'src/app/demo/interfaces/interfacesLocales';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Message } from 'primeng/api';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-mis-tickets',
  templateUrl: './mis-tickets.component.html',
  styleUrl: './mis-tickets.component.scss'
})
export class MisTicketsComponent implements OnInit {
  loading: boolean = true;

  constructor (private ticketsService: TicketsServiceService, private authService:AuthService, private route: Router,) { }
  tickets = [];
  cols: any[];
  user : any;
  alert:boolean = false;
  messages: Message[] | undefined;
  searchTerm: string = '';
  messagge2:Message[] | undefined


  private unsubscribe$ = new Subject<void>();

  //paginator
  first: number = 0;
  rows: number = 10;
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.getTicketsForUser(); // Actualiza los tickets al cambiar de página

    } //termina paginator
  

  ngOnInit() {
    this.user = this.authService.getUser()
    this.getTicketsForUser()

    this.messages = [
      {severity:'info', detail:'Aun no tienes tickets por el momento'}
    ]
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  getTicketsForUser(){
    this.ticketsService.getTicketsForUser(this.user.usuario).subscribe((res) => {
      if (res && Array.isArray(res)) {
        this.tickets = res;
      } else {
        this.tickets = [];
        this.alert = true;
      }
      this.loading = false;
    }, (error) => {
      this.tickets = [];
      this.loading = false;
      this.alert = true;
    });
  }
  

  getTicketsForId2(): void {
    this.ticketsService.getTicketsForUser(this.user.usuario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.tickets = res;
        this.loading = false
      });
  }

  getSeverity(status: string) {
    switch (status) {
        case 'abierto':
            return 'success';
        case 'en progreso':
            return 'warning';
        case 'cerrado':
            return 'danger';
        case 'terminado':
            return 'info';
            default:
            return 'default'; // O cualquier otro valor por defecto que desees
    }
}

redirectTo(id){
  //para redirigir al ticket individual
  this.route.navigate(['./tickets/crearTicket/', id])
}


clearSearch() {
  this.searchTerm = '';
}

getTicketsByStatus(status?: string) {

  if(!status){
    return this.tickets;
  }
  // console.log(status)
  const ticketsFilter = (this.tickets.filter(ticket => ticket.estatus === status));
  // console.log(ticketsFilter.length)
  return this.tickets.filter(ticket => ticket.estatus === status);

}

messageDiferent(message){

  if(message ===2){

    this.messagge2 = [
      {severity:'info', detail:'no hay tickets abiertos aun '}
    ]
  }
  
}

exportToExcel(estatus?): void {
  const ticketFiltered = this.getTicketsByStatus(estatus)
  // Define los datos a exportar
  const ticketData = ticketFiltered.map(ticket => ({
      'ID': ticket.id,
      'Título': ticket.titulo,
      'Descripción': ticket.descripcion,
      'Fecha': new Date(ticket.fecha).toLocaleDateString(),
      'fechaFin':ticket.fechaFin,
      'Estatus': ticket.estatus,
      'Nombre': ticket.nombre,
      'correo':ticket.correo,
      'nombreUsuario':ticket.nombre_usuario,
      'trabajadoPor': ticket.trabajadoPor
      // 'descripcion': ticket.descripcion,
      // 'trabajadoPor': ticket.trabajadoPor,
      // 'paraAreaDe': ticket.paraAreaDe,
      // 'comentario de solicitante': ticket.comentario2,
      // 'comentario de quien lo trabajo': ticket.comentario
  }),

  console.log(this.tickets)
);

  // Crea una hoja de trabajo (worksheet) y un libro de trabajo (workbook)
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ticketData);
  const wb: XLSX.WorkBook = { Sheets: { 'Tickets': ws }, SheetNames: ['Tickets'] };

  // Convierte el libro de trabajo a un archivo de tipo Excel
  const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Guarda el archivo
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'tickets.xlsx');
}






}
