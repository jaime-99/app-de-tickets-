import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesComponent } from './materiales.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { DetallesComponent } from './solicitudes/detalles/detalles.component';
import { SolicitudesAsignadasComponent } from './solicitudes/solicitudes-asignadas/solicitudes-asignadas.component';
import { MisSolicitudesComponent } from './mis-solicitudes/mis-solicitudes.component';


@NgModule({
  declarations: [
    MaterialesComponent,
    SolicitudesComponent,
    DetallesComponent,
    SolicitudesAsignadasComponent,
    MisSolicitudesComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class MaterialesModule { }
