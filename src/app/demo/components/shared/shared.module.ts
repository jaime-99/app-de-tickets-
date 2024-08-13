import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  exports: [
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    ConfirmPopupModule
  ]
})
export class SharedModule { }
