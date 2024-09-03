import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-requizicion',
  templateUrl: './add-requizicion.component.html',
  styleUrl: './add-requizicion.component.scss'
})
export class AddRequizicionComponent implements OnInit {

  constructor (private fb: FormBuilder) {}
  requisicionForm: FormGroup;

  currentStep: number = 1;


  ngOnInit(): void {

  
    this.requisicionForm = this.fb.group({
      fecha: ['', [Validators.required, Validators.minLength(3)]],
      nombreSolicitante: ['', [Validators.required]],
      puestoSolicitante: ['', [Validators.required,]],
      regionSolicitante: ['', [Validators.required,]],
      nombresVacante: ['', [Validators.required,]],
      motivo: ['', [Validators.required,]],
      noVacantes: ['', [Validators.required,]],
      sexo: ['', [Validators.required,]],
      estadoCivil: ['', [Validators.required,]],
      //segundaParte
      rangoEdad: ['', [Validators.required,]],
      nivelDeEstudios: ['', [Validators.required,]],
      horariosEstablecidos: ['', [Validators.required,]],
      tiempoMinExperiencia: ['', [Validators.required,]],
      requiereDominioIdiomas: ['', [Validators.required,]],
      salario: ['', [Validators.required,]],
      //parte 3 
      actividadesPrincipales: ['', [Validators.required,]],
      conocimientosPrevios: ['', [Validators.required,]],
      requerimientosAdicionales: ['', [Validators.required,]],
      publicacionVacante: ['', [Validators.required,]],
      
      

    });

  }


  next(){
    //boton para darle siguiente
    this.currentStep++;
  }

  previous(): void {
    this.currentStep--;
  }

}
