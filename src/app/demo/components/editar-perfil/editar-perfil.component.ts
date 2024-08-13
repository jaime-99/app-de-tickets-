import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PerfilService } from './services/perfil.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent implements OnInit {

  constructor  ( private authService:AuthService,
     private perfilService:PerfilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
   ) {

    this.userForm = new FormGroup({
      id: new FormControl(''),
      usuario: new FormControl({value:'', disabled:true}),  // Inicializar con un valor vacío
      nombre: new FormControl(''),
      apellido_paterno: new FormControl(''),
      apellido_materno: new FormControl(''),
      area: new FormControl({value:'', disabled:true}),
      correo: new FormControl(''),
      ciudad: new FormControl({value:'', disabled:true})
    });
  }
  userForm: FormGroup;
  contraForm:FormGroup;
  user:any 

  ngOnInit(): void {

    this.contraForm = new FormGroup({
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
    })

   this.user =  this.authService.getUser();

   this.userForm.patchValue({
    id: this.user.id
  });

   this.userForm.reset(this.user)
  }


  editarPerfil(){
    this.perfilService.putTicket(this.userForm.value).subscribe((res)=>{
      console.log(res)
    })
  }


  // es el cofnirm de actualizar Perfil
  confirmPerfil(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de cambiar los datos?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
                this.editarPerfil();
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Has Actualizado el Perfil', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  //es el confirm del password 
  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de cambiar la contrasena?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          let pass1 = this.contraForm.get('password').value
          let pass2 = this.contraForm.get('repeatPassword').value
            if(pass1 === pass2){
                this.changePassword()
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Has Cambiado la contrasena', life: 3000 });
                }else{
                  return;
                }
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  changePassword(){
    let pass1 = this.contraForm.get('password').value
    let pass2 = this.contraForm.get('repeatPassword').value
    if(pass1 === pass2){

    }
  }

}
