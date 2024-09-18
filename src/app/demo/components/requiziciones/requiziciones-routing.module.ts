import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequizicionesComponent } from './requiziciones.component';
import { RequisicionesSolicitadasComponent } from './requisiciones-solicitadas/requisiciones-solicitadas.component';
import { RequisicionSolicitadaDetalleComponent } from './requisiciones-solicitadas/requisicion-solicitada-detalle/requisicion-solicitada-detalle.component';
import { PlantillaMensajeComponent } from './plantilla-mensaje/plantilla-mensaje.component';
import { requisicionesGuard } from './requisiciones-guard.guard';

const routes: Routes = [{ path: '', component: RequizicionesComponent },
  {path: 'requisiciones_solicitadas', component: RequisicionesSolicitadasComponent, canActivate:[requisicionesGuard]},
  {path: 'requisicion_Creada', component: PlantillaMensajeComponent},
  {path: ':id', component: RequisicionSolicitadaDetalleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequizicionesRoutingModule { }
