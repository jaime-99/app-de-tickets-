import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, EmailValidator } from '@angular/forms';
import { AuthService } from '../auth.service';
import { areasCGP } from '../interfaces/areas.interface';
import { PerfilService } from '../../editar-perfil/services/perfil.service';
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

  constructor(private fb: FormBuilder,
  private authService:AuthService,
  private perfilService:PerfilService) {}

ngOnInit() {

  this.messages = [{ severity: 'info', detail: 'Creaste con exito tu cuenta !' }];


  this.registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    apellido_paterno: ['', [Validators.required]],
    apellido_materno: ['', Validators.required],
    usuario: ['', Validators.required],
    area: [this.areaSeleccionada, Validators.required],
    correo: ['', [Validators.required, Validators.email, this.emailDomainValidator()]],
    ciudad: [this.ciudadSeleccionada, [Validators.required]],
    contrasenia: ['', [Validators.required, Validators.minLength(5)]],
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

    // console.log(response)
    // console.log(response.user_id)
    // return;
    let userId = response.user_id;
    let area = this.registroForm.get('area').value;
    let ubicacion = this.registroForm.get('ciudad').value;
    console.log(ubicacion)
    // que me regrese el id del usuario

    if(area === 'Comercial' && ubicacion ==='Saltillo') {
      // colocar el tipoId en 3 
      this.perfilService.putTipoPerfil(userId,5).subscribe(()=>{
      })
    }
    else if(area === 'Comercial'){
      //colocar el tipoId en usuario Ticket
      this.perfilService.putTipoPerfil(userId, 4).subscribe(()=>{

      })
    }
    else if(area === 'Administracion'){
      //colocar el tipoId en usuario Ticket
      this.perfilService.putTipoPerfil(userId, 4).subscribe(()=>{

      })
    }
    else if(area === 'RH'){
      //colocar el tipoId en usuario Ticket
      this.perfilService.putTipoPerfil(userId,4).subscribe(()=>{
      })
    }
    else if(area === 'Materiales'){
      //colcoar el tipoId en usuarioTicket
      this.perfilService.putTipoPerfil(userId,4).subscribe(()=>{

      })
    }else if(area === 'Diseño'){
    // colocar el tipo id en usuarioTicket
    this.perfilService.putTipoPerfil(userId,2).subscribe(()=>{

    })
    }
  
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
// es para validar el correo
 emailDomainValidator(): ValidatorFn {
  const allowedDomains = ['@cgpgroup.mx', '@egroup.mx', '@consultoriaglobal.mx'];

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Si no hay valor, no se aplica la validación
    }

    const email = control.value;
    const domain = allowedDomains.find(domain => email.endsWith(domain));

    return domain ? null : { invalidDomain: true };
  };
}


isFieldInvalid(field: string): boolean {
  const control = this.registroForm.get(field);
  return control ? control.invalid && control.touched : false;
}

}