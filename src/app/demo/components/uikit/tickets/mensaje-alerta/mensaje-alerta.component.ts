import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsServiceService } from '../../services/tickets-service.service';

@Component({
  selector: 'app-mensaje-alerta',
  templateUrl: './mensaje-alerta.component.html',
  styleUrl: './mensaje-alerta.component.scss'
})
export class MensajeAlertaComponent implements OnInit {
  ticket:any;
  loading  = false;

  constructor (private activateRoute:ActivatedRoute, private ticketService:TicketsServiceService,
    private router: Router
  ) { }
  ticketId:any;
  ngOnInit(): void {

   this.ticketId =  this.activateRoute.snapshot.paramMap.get('ticketId');
    this.getTicketForId()
  }


  getTicketForId(){
    this.ticketService.getTicketForId(this.ticketId).subscribe((res)=>{
      this.ticket = res 
      this.loading = true;
    })
  }

  backToMisTickets(){
    this.router.navigateByUrl('tickets/crearTicket/ticketsSeleccionados')
  }
// sera el template de cuando acepta el ticket al usuario que se lo enviaron
}
