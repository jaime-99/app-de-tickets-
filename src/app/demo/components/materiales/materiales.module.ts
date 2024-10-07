import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesComponent } from './materiales.component';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { DetallesComponent } from './solicitudes/detalles/detalles.component';


@NgModule({
  declarations: [
    MaterialesComponent,
    SolicitudesComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    SharedModule
  ],
  providers:[
    MessageService
  ]
})
export class MaterialesModule { }
