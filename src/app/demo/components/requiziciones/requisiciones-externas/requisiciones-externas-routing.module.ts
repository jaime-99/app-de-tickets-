import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisicionesExternasComponent } from './requisiciones-externas.component';
import { MisRequisicionesExternasComponent } from './mis-requisiciones-externas/mis-requisiciones-externas.component';

const routes: Routes = [
  { path: '', component: RequisicionesExternasComponent },
  {path: 'mis-requisiciones-externas', component:MisRequisicionesExternasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicionesExternasRoutingModule { }
