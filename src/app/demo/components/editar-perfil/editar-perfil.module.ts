import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarPerfilRoutingModule } from './editar-perfil-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditarPerfilComponent } from './editar-perfil.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [EditarPerfilComponent],
  imports: [
    CommonModule,
    EditarPerfilRoutingModule,
    SharedModule,
    // InputTextModule
  ],

  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class EditarPerfilModule { }
