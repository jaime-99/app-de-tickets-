import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialesComponent } from './materiales.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { DetallesComponent } from './solicitudes/detalles/detalles.component';
import { SolicitudesAsignadasComponent } from './solicitudes/solicitudes-asignadas/solicitudes-asignadas.component';
import { MisSolicitudesComponent } from './mis-solicitudes/mis-solicitudes.component';

const routes: Routes = [
  // crear una nueva solicitud
  { path: 'nueva-solicitud', component: MaterialesComponent },
  // todas las solicitudes
  {path: 'Asignadas', component: SolicitudesComponent },
  // las solicitudes asignadas para cada usuario
  {path: 'mis-solicitudes-asignadas', component: SolicitudesAsignadasComponent },

  // las solicitudes de un usuario que ha enviado solicitudes
  {path:  'mis-solicitudes', component: MisSolicitudesComponent   },
  //solicitudes con detalle
  {path: 'detalle/:id', component: DetallesComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialesRoutingModule { }
