import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



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
    ConfirmPopupModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    MessagesModule,
    TableModule,
    KeyFilterModule,
    InputNumberModule,
    TagModule,
    MultiSelectModule,
    FormsModule,
    ProgressSpinnerModule,
    SkeletonModule,
    FileUploadModule,
    DialogModule,
    TabViewModule,
    ImageModule,
    ConfirmDialogModule
    
    
  ]
})
export class SharedModule { }
