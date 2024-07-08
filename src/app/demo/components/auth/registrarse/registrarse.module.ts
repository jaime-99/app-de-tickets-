import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { LoginRoutingModule } from '../login/login-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [RegistrarseComponent],
  imports: [
    CommonModule,
    RegistrarseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    LoginRoutingModule,
    CheckboxModule,
    PasswordModule,
    DropdownModule,
    MessagesModule

  ]
})
export class RegistrarseModule { }
