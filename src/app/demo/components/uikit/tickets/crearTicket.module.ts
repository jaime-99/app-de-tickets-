import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearTicketPage } from './crearTicketPage';
import { CrearTicketPageRoutingModule } from './crearTicket-routing.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';

//componentes 
import { MisTicketsComponent } from './mis-tickets/mis-tickets.component';
import { TicketDetalleComponent } from './ticket-detalle/ticket-detalle.component';
import { TicketsTrabajadosComponent } from './tickets-trabajados/tickets-trabajados.component';
import { TicketsSeleccionadosComponent } from './tickets-seleccionados/tickets-seleccionados.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';

//servicios 
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PipeSearchPipe } from './pipes/pipe-search.pipe';
import { MensajeAlertaComponent } from './mensaje-alerta/mensaje-alerta.component';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CrearTicketPageRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		ReactiveFormsModule,
		MessagesModule,
		CardModule,
		TableModule,
		TagModule,
		RatingModule,
		ProgressSpinnerModule,
		ChipModule,
		ConfirmPopupModule,
		ConfirmDialogModule,
		ToastModule,
		DialogModule,
		TabViewModule ,
		DividerModule,
		PaginatorModule,
		AccordionModule
		
		
	],
	declarations: [
		CrearTicketPage,
		MisTicketsComponent,
		TicketDetalleComponent,
		TicketsTrabajadosComponent,
		TicketsSeleccionadosComponent,
		MensajeAlertaComponent,

		//pipes 
		PipeSearchPipe
	],
	providers: [ConfirmationService,MessageService]
})
export class crearTicketModule { }
