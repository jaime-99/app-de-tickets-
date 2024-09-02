import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrearTicketPage } from './crearTicketPage';
import { MisTicketsComponent } from './mis-tickets/mis-tickets.component';
import { TicketDetalleComponent } from './ticket-detalle/ticket-detalle.component';
import { TicketsTrabajadosComponent } from './tickets-trabajados/tickets-trabajados.component';
import { TicketsSeleccionadosComponent } from './tickets-seleccionados/tickets-seleccionados.component';
import { MensajeAlertaComponent } from './mensaje-alerta/mensaje-alerta.component';
import { TicketsGuard } from 'src/app/demo/guards/ticketsTrabajados.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrearTicketPage },
		{path: 'misTickets', component:MisTicketsComponent},
		{path: 'ticketsTrabajados', component:TicketsTrabajadosComponent,
			canActivate:[TicketsGuard]
		},
		{path: 'ticketsSeleccionados', component:TicketsSeleccionadosComponent,
			canActivate:[TicketsGuard]
		},
		{path: 'ticketAceptado/:ticketId', component:MensajeAlertaComponent},
		{path: ':id', component:TicketDetalleComponent},
		{path: ':id/:T', component:TicketDetalleComponent}, // parametro opcional
	])],
	exports: [RouterModule]

})
export class CrearTicketPageRoutingModule { }

