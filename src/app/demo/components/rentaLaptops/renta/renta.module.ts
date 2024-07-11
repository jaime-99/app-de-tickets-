import { NgModule } from '@angular/core';

import { RentaComponent } from './renta.component';
import { CommonModule } from '@angular/common';
import { rentaLaptopRoutingModule } from './renta-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HistorialRentaComponent } from '../historial-renta/historial-renta.component';
import { TableModule } from 'primeng/table';
import { RentaDetalleComponent } from './renta-detalle/renta-detalle.component';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { RentaAsignadaComponent } from './renta-asignada/renta-asignada.component';
import { RentaAsignadaDetalleComponent } from './renta-asignada-detalle/renta-asignada-detalle.component';
import { SearchRentaPipe } from './pipes/search-renta.pipe';
import { DividerModule } from 'primeng/divider';
import { changeBoolean } from './pipes/changueBoolean.pipe';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { ResponsivaComponent } from '../responsiva/responsiva.component';

@NgModule({
    imports: [
        //importantes
        CommonModule,
        rentaLaptopRoutingModule,
        //modulos
        TabViewModule,
        TimelineModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        CalendarModule,
        CheckboxModule,
        ReactiveFormsModule,
        RadioButtonModule,
        InputTextareaModule,
        ConfirmDialogModule,
        ToastModule,
        TableModule,
        DialogModule,
        ProgressSpinnerModule,
        CardModule,
        DividerModule,
        TagModule,
        MessagesModule,

        //pipes 
        SearchRentaPipe,
        changeBoolean
        
    ],
    exports: [],
    declarations: [
        RentaComponent,
        HistorialRentaComponent,
        RentaDetalleComponent,
        RentaAsignadaComponent,
        RentaAsignadaDetalleComponent,

        //inputs y outputs
        ResponsivaComponent
    ],
    providers: [ConfirmationService,MessageService],
})
export class rentaModule { }
