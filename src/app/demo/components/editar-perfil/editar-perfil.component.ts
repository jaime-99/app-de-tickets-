import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      id: new FormControl(''),
      password: new FormControl('', [
        Validators.required, // El campo es obligatorio
        Validators.minLength(5), // La contraseña debe tener al menos 8 caracteres
      ]),
      
      repeatPassword: new FormControl('',[
        Validators.required, Validators.minLength(5),
      ]),
    })

   this.user =  this.authService.getUser();

   this.userForm.patchValue({
    id: this.user.id
  });

   this.userForm.reset(this.user)
  }


  editarPerfil(){
    this.perfilService.putPerfil(this.userForm.value).subscribe((res)=>{
      // console.log(res)
    })
  }


  // es el cofnirm de actualizar Perfil
  confirmPerfil(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de cambiar los datos?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Si',
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
    this.contraForm.patchValue({id:this.user.id})
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de cambiar la contrasena?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          if(this.contraForm.invalid){
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'la contraseña debe tener minimo 5 caracteres', life: 3000 });
            return;
          }

          let pass1 = this.contraForm.get('password')?.value
          let pass2 = this.contraForm.get('repeatPassword')?.value
          // if(pass1.length>3 && pass2.length>3)
            if(pass1 === pass2){
                this.changePassword()
                this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Has Cambiado la contrasena', life: 3000 });
                }else{
                  this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Debe Coincidir la contrasena', life: 3000 });
                  // return;
                }
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

  changePassword(){

    const contrasenia = this.contraForm.get('password').value


    if(this.contraForm.valid)
    this.perfilService.putPassword(this.user.id, contrasenia).subscribe((res)=>{
    this.contraForm.reset()
      
    })



  }

}
