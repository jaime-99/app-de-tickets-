import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicionesExternasRoutingModule } from './requisiciones-externas-routing.module';
import { MisRequisicionesExternasComponent } from './mis-requisiciones-externas/mis-requisiciones-externas.component';
import { RequisicionesExternasComponent } from './requisiciones-externas.component';
import { SharedModule } from '../../shared/shared.module';
import { ExternaDetalleComponent } from './externa-detalle/externa-detalle.component';
import { TodasExternasComponent } from './todas-externas/todas-externas.component';


@NgModule({
  declarations: [
    RequisicionesExternasComponent,
    MisRequisicionesExternasComponent,
    ExternaDetalleComponent,
    TodasExternasComponent
  ],
  imports: [
    CommonModule,
    RequisicionesExternasRoutingModule,
    SharedModule
  ]
})
export class RequisicionesExternasModule { }
