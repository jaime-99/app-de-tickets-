import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { areasCGP } from '../interfaces/areas.interface';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent  implements OnInit{

registroForm: FormGroup;

areas = areasCGP.areas
ciudades = areasCGP.ciudades;
areaSeleccionada :any;
ciudadSeleccionada:any;
validTemplate: boolean = false;
messages: { severity: string; detail: string; }[];

  constructor(private fb: FormBuilder, private authService:AuthService) {}

ngOnInit() {

  this.messages = [{ severity: 'info', detail: 'Creaste con exito tu cuenta !' }];


  this.registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    apellido_paterno: ['', [Validators.required]],
    apellido_materno: ['', Validators.required],
    usuario: ['', Validators.required],
    area: [this.areaSeleccionada, Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    ciudad: [this.ciudadSeleccionada, [Validators.required]],
    contrasenia: ['', Validators.required],
});

}
  updateArea(name){
    this.areaSeleccionada = name
    }
  updateCiudad(name){
    this.ciudadSeleccionada = name
    }

addUser() {

  this.registroForm.get('area').setValue(this.areaSeleccionada);
  this.registroForm.get('ciudad').setValue(this.ciudadSeleccionada);

  // return;
  this.validTemplate = true;
  

  if(this.registroForm.valid){
    const usuario = this.registroForm.value;
  this.authService.createUser(usuario
  ).subscribe(response =>{
  })
  
  }else{

  }
//   if (this.registroForm.valid) {
//     // manejar la sumisión del formulario
//     console.log(this.registroForm.value);
//     console.log('ticket valido');
//   } else {
//       console.log('Formulario inválido, datos:', this.registroForm.value);
//       this.registroForm.markAllAsTouched();
//   }
// }


}

}