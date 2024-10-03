import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisicionesExternasComponent } from './requisiciones-externas.component';
import { MisRequisicionesExternasComponent } from './mis-requisiciones-externas/mis-requisiciones-externas.component';
import { ExternaDetalleComponent } from './externa-detalle/externa-detalle.component';
import { TodasExternasComponent } from './todas-externas/todas-externas.component';

const routes: Routes = [
  { path: '', component: RequisicionesExternasComponent },
  {path: 'mis-requisiciones-externas', component:MisRequisicionesExternasComponent},
  {path: 'todas-las-requisiciones', component:TodasExternasComponent},
  {path: ':externaId', component: ExternaDetalleComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicionesExternasRoutingModule { }
