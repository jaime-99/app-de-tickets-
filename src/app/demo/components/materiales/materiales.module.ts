import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesComponent } from './materiales.component';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    MaterialesComponent
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
