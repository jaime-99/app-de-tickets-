import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequisicionesExternasRoutingModule } from './requisiciones-externas-routing.module';
import { MisRequisicionesExternasComponent } from './mis-requisiciones-externas/mis-requisiciones-externas.component';
import { RequisicionesExternasComponent } from './requisiciones-externas.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    RequisicionesExternasComponent,
    MisRequisicionesExternasComponent
  ],
  imports: [
    CommonModule,
    RequisicionesExternasRoutingModule,
    SharedModule
  ]
})
export class RequisicionesExternasModule { }
