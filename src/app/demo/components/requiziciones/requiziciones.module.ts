import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequizicionesRoutingModule } from './requiziciones-routing.module';
import { RequizicionesComponent } from './requiziciones.component';
import { SharedModule } from '../shared/shared.module';
import { AddRequizicionComponent } from './add-requizicion/add-requizicion.component';
import { RequisicionesSolicitadasComponent } from './requisiciones-solicitadas/requisiciones-solicitadas.component';
import { RequisicionSolicitadaDetalleComponent } from './requisiciones-solicitadas/requisicion-solicitada-detalle/requisicion-solicitada-detalle.component';
import { HabilidadesRequeridasComponent } from './habilidades-requeridas/habilidades-requeridas.component';


@NgModule({
  declarations: [
    RequizicionesComponent,// primer componente
    AddRequizicionComponent,// componente para agregar requiziciones , se hara inputs de prueba
    RequisicionesSolicitadasComponent,// componente para ver las requisiciones
    RequisicionSolicitadaDetalleComponent,// componente para ver requisiciones pero individual con su id
    
    //inputs o outputs usados 
    HabilidadesRequeridasComponent
  ],
  imports: [
    CommonModule,
    //compartidos
    SharedModule,
    RequizicionesRoutingModule,
  ]
})
export class RequizicionesModule { }
