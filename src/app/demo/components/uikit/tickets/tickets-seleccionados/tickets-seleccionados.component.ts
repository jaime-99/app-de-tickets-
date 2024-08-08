import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../../services/tickets-service.service';
import { tickets } from 'src/app/demo/interfaces/interfacesLocales';
import { AuthService } from '../../../auth/auth.service';
import { delay } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import printJS from 'print-js';
 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

sortAscending: boolean = true; // Variable para controlar el orden de la ordenación

paginatedTickets: any[] = [];
  first: number = 0;
  rows: number = 4;

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
        // this.paginateTickets();
        // console.log('tickets',this.tickets)
      } else if (res && typeof res === 'object') {
        this.tickets = []  // Con
        this.alert = true;
    }
    this.loading = false;
    return;
  })
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateTickets();
  }

  paginateTickets() {
    const tickets = [
      {
          id: 68,
          titulo: "servidor",
          estatus: "terminado",
          fecha: "2024-07-03",
          nombre: "Melisa",
          apellido: "Garcia",
          correo: "generalistarh@cgpgroup.mx",
          descripcion: "el servidor no me funciona",
          nombre_usuario: "Melisa123",
          para_area: "1",
          area: "RH",
          IdCategoria: 5,
          trabajadoPor: "jaime"
      }
  ];
  
    const start = this.first;
    const end = this.first + this.rows;
    console.log(this.tickets)
    this.paginatedTickets = this.filteredTickets.slice(start, end);
    console.log(this.paginatedTickets)

  }

  showDialog(id){

    this.ticketsService.getTicketForId(id).subscribe((res)=>{
      this.ticket = res
      console.log('ticket individual',this.ticket)
      //todo aqui llamare a notificaciones tipo 3
    })
    this.visible = true;

    this.ticketForm.patchValue({idTicket:id});
    this.ticketForm.patchValue({fechaFin:this.fechaHoy});

  }

  addNotification3(ticket){
    const data = {
      user_id:ticket.usuarioId,
      usuario: ticket.nombre_usuario,
      message: `el ticket con el id ${ticket?.id} que trabajo el usuario ${ticket?.trabajadoPor} ha cambiado de estatus a TERMINADO
      ya puedes CERRAR el ticket`,
      tipo: '5',
    }

    this.ticketsService.addNotification(data).subscribe((res)=>{
      //todo hacer algo despues
      console.log('se agrega la notificacion de terminado', res)
    })
  }

  openComment(){
    this.visible2 = true;
  }


  onSubmit(){
    //esta funcion es para enviar los datos de detalles el ticket cuando se termina el ticket
    // location.reload() // refrescar pagina
    if(this.ticketForm.valid){
      
      this.ticketsService.postTicketDetalle(this.ticketForm.value).subscribe((res)=>{
        
        if(res){
        const ticketIdValue = this.ticketForm.get('idTicket').value;

        this.ticketsService.putTicketEstatus(ticketIdValue, 'terminado').subscribe(()=>{
          this.addNotification3(this.ticket);
          // location.reload();
          setTimeout(() => {
            location.reload();
          }, 3000); // 3000 ms = 3 segundos
          
        });
        
        }
      })

    }
  }

  sendNotification(){// esto no se esta usando 
    const data = {
      user_id: this.ticket.usuarioId,
      usuario: this.ticket.nombre_usuario,
      message: `el usuario ${this.user.usuario} del area ${this.ticket?.paraAreaDe} ha terminado tu ticket`,
      tipo: '5',
    }

    this.ticketsService.addNotification(data).subscribe(()=>{

    })
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
      // this.filteredTickets = [...this.tickets];
      this.filteredTickets = this.tickets
      // this.paginateTickets();
      console.log('esta opcion se escoge')
    }

    this.paginateTickets();
  }


  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortTicketsByDate();
    this.paginateTickets();
    // this.filteredTickets = [...this.tickets]; // Asegúrate de que filteredTickets refleje el orden actualizado

}

sortTicketsByDate() {
    this.tickets.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return this.sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
}

exportToExcel(){
  //exportaremos los datos de este componente de todos los tickets

  const ticketData = this.filteredTickets.map(ticket => ({
    'ID': ticket.id,
    'Título': ticket.titulo,
    'Descripción': ticket.descripcion,
    'Fecha': new Date(ticket.fecha).toLocaleDateString(),
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

);

const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ticketData);
const wb: XLSX.WorkBook = { Sheets: { 'Tickets': ws }, SheetNames: ['Tickets'] };

// Convierte el libro de trabajo a un archivo de tipo Excel
const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

// Guarda el archivo
saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'ticketsSeleccionados.xlsx');

}

exportToPDF() {
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


