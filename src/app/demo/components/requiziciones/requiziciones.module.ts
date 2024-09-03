import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequizicionesRoutingModule } from './requiziciones-routing.module';
import { RequizicionesComponent } from './requiziciones.component';
import { SharedModule } from '../shared/shared.module';
import { AddRequizicionComponent } from './add-requizicion/add-requizicion.component';


@NgModule({
  declarations: [
    RequizicionesComponent,// primer componente
    AddRequizicionComponent// componente para agregar requiziciones , se hara inputs de prueba

  ],
  imports: [
    CommonModule,
    //compartidos
    SharedModule,
    RequizicionesRoutingModule,
    
  ]
})
export class RequizicionesModule { }
