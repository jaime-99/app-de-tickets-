import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorias } from '../interfaces/clases';
import { RequizicionesService } from '../requiziciones.service';
@Component({
  selector: 'app-add-requizicion',
  templateUrl: './add-requizicion.component.html',
  styleUrl: './add-requizicion.component.scss'
})
export class AddRequizicionComponent implements OnInit {

  constructor (private fb: FormBuilder, private requisicionService:RequizicionesService) {}
  requisicionForm: FormGroup; // formulario
  currentStep: number = 1; // pasos / steps 
  vacantes = Categorias.vacante;
  sexo = Categorias.sexo;
  estadoCivil = Categorias.estadoCivil;
  nivelEstudios = Categorias.nivelEstudios;
  tiempoExperiencia = Categorias.tiempoExperiencia;
  regiones = Categorias.region
  edades = Categorias.edad
  otherSelected:boolean = false;
  ngOnInit(): void {



  
    this.requisicionForm = this.fb.group({
      fecha: [{value:this.actualDate(), disabled:true}, [Validators.required]],
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
      horariosEstablecidos: ['8:30-5:30', [Validators.required,]],
      tiempoMinExperiencia: ['', [Validators.required,]],
      requiereDominioIdiomas: ['no', [Validators.required,]],
      salario: ['', [Validators.required,]],
      //parte 3 
      actividadesPrincipales: ['', [Validators.required,]],
      conocimientosPrevios: ['', [Validators.required,]],
      requerimientosAdicionales: ['', [Validators.required,]],
      publicacionVacante: ['', [Validators.required,]],
      
      //parte 4, habilidades requeridas(analisis)
      compresion_verbal: [false, []],
      seguimiento_instrucciones: [false, []],
      objetividad_en_manejo: [false, []],
      //parte 4 . (liderazgo)
      manejo_personal: [false, []],
      negociacion: [false, []],
      toma_decisiones: [false, []],
      poder_personal: [false, []],
      //parte 4 comunicacion
      facilidad_de_palabra: [false, []],
      dominio_publico: [false, []],
      asertividad: [false, []],
      // parte 4 PLANEACION/ORGANIZACION
      Iniciativa: [false, []],
      Orientado_resultados: [false, []],
      clasificacion_orden: [false, []],
      trabajo_equipo: [false, []],
      creatividad: [false, []],
      adaptable_a_cambios: ['', []],
      concentracion: [false, []],
      manejo_de_estres: [false, []],
      //parte 4 actitudes requeridas
      responsable: [false, []],
      empatico: [false, []],
      emprendedor: [false, []],
      colaborador: [false, []],
      
      // es para el horario de la opcion extra 
      horario: ['no'],

    });

    // this.requisicionForm.get('horario')?.valueChanges.subscribe(value => {
    //   this.otherSelected = value === 'si';
    // });
  }



  next(){
    //boton para darle siguiente
    this.currentStep++;
  }

  previous(): void {
    this.currentStep--;
  }

  //se envia formulario 
  onSubmit(){
    const formValues = this.requisicionForm.getRawValue(); // Captura el valor del formulario

    const payload = {
      datos_puesto: {
        fecha_solicitud: formValues.fecha,
        nombre_solicitante: formValues.nombreSolicitante,
        puesto_solicitante: formValues.puestoSolicitante,
        region_solicitante: formValues.regionSolicitante,
        nombre_vacante: formValues.nombresVacante,
        motivo_vacante: formValues.motivo,
        no_vacante: formValues.noVacantes,
        sexo: formValues.sexo,
        estado_civil: formValues.estadoCivil
      },
      datos_puesto2: {
        rango_edad: formValues.rangoEdad,
        nivel_estudios_minimo: formValues.nivelDeEstudios,
        horario_dias_laborales: formValues.horariosEstablecidos,
        tiempo_minimo_experiencia: formValues.tiempoMinExperiencia,
        requiere_dominio_idiomas: formValues.requiereDominioIdiomas ? 1 : 0,
        salario: formValues.salario
      },
      datos_puesto3: {
        actividades_principales: formValues.actividadesPrincipales,
        conocimientos_previos: formValues.conocimientosPrevios,
        requerimientos_adicionales: formValues.requerimientosAdicionales,
        publicacion_vacante: formValues.publicacionVacante,
        presupuesto: formValues.presupuesto //eliminar
      },
      habilidades_requeridas: {
        compresion_verbal: formValues.compresion_verbal ? 1 : 0,
        seguimiento_de_instrucciones: formValues.seguimiento_instrucciones ? 1 : 0,
        objetividad_en_manejo_informacion: formValues.objetividad_en_manejo ? 1 : 0,
        manejo_de_personal: formValues.manejo_personal ? 1 : 0,
        negociacion: formValues.negociacion ? 1 : 0,
        toma_de_decisiones: formValues.toma_decisiones ? 1 : 0,
        poder_personal: formValues.poder_personal ? 1 : 0,
        facilidad_de_palabra: formValues.facilidad_de_palabra ? 1 : 0,
        dominio_publico: formValues.dominio_publico ? 1 : 0,
        asertividad: formValues.asertividad ? 1 : 0
      }
    };

    console.log(payload);
    return;

    this.requisicionService.postRequisicion(payload)
    .subscribe((res)=>{
      console.log(res)
    })
  }

  isFieldInvalid(field: string): boolean {
    const control = this.requisicionForm.get(field);
    return control ? control.invalid && control.touched : false;
  }


  actualDate(){
    const date = new Date();
    return date.toLocaleDateString()
  }


  onRadioButtonChange(value: string): void {
    // console.log(value)
    this.otherSelected = value === 'si'; // dice que si la variable otherSelected es igual al value si
    if (this.otherSelected) {
      this.requisicionForm.get('horariosEstablecidos').setValue(''); // Limpiar el campo de texto si "otro" no está seleccionado
      
    }else{
      this.requisicionForm.get('horariosEstablecidos').setValue('8:30-5:30'); // Limpiar el campo de texto si "otro" no está seleccionado

    }
    this.checkFormStatus();

  }

  checkFormStatus(){


  }






}
