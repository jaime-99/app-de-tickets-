import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequizicionesComponent } from './requiziciones.component';
import { RequisicionesSolicitadasComponent } from './requisiciones-solicitadas/requisiciones-solicitadas.component';

const routes: Routes = [{ path: '', component: RequizicionesComponent },
  {path: 'requisiciones_solicitadas', component: RequisicionesSolicitadasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequizicionesRoutingModule { }
