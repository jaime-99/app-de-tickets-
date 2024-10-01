import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoriasRequisicionE} from './/interfaces/clases-externas'
import { RequizicionesService } from '../requiziciones.service';
@Component({
  selector: 'app-requisiciones-externas',
  templateUrl: './requisiciones-externas.component.html',
  styleUrl: './requisiciones-externas.component.scss'
})
export class RequisicionesExternasComponent implements OnInit {
  requisicionForm2: FormGroup;
  //es para las paginas
  currentStep:number = 1;
  puestoSolicitante = categoriasRequisicionE.puestoSolicitante;
  regionSolicitante = categoriasRequisicionE.regionSolicitante;
  numeroDeParticipantes = categoriasRequisicionE.numParticipantes;
  horariosYDias = categoriasRequisicionE.horario;
  numVacantes = categoriasRequisicionE.numVacantes;
  isOtroSelected: boolean = false;
  messageSuccesful: boolean = false;
  constructor(private fb: FormBuilder, private requisicionesService:RequizicionesService) {
    this.requisicionForm2 = this.fb.group({
        usuario: ['usuario123', Validators.required],
        nombre_del_solicitante: ['Juan Pérez', Validators.required],
        puesto_del_solicitante: ['Coordinador', Validators.required],
        region_solicitante: ['Noroeste', Validators.required],
        tematica_solicitada: ['Matemáticas', Validators.required],
        num_vacantes: [2, Validators.required],
        localidad_impartira: ['Culiacán', Validators.required],
        num_participantes: [30, Validators.required],
        horarios_dias_requeridos: ['Lunes a Viernes, 10:00 a 12:00', Validators.required],
        motivo_del_requerimiento_cliente: ['Requerimiento por aumento de alumnos'],
        honorario_a_ofrecer: ['2000', Validators.required],
        escolaridad_minima: ['Licenciatura', Validators.required],
        sexo: ['Masculino', Validators.required],
        requiere_dominio_idiomas: [true, Validators.required],
        anios_experiencia: [3, Validators.required],
        principales_temas: ['Álgebra, Geometría']
    })
  }
  
  ngOnInit(): void {
    
  }

  next(){
    //boton para darle siguiente
    this.currentStep++;
  }

  previous(): void {
    this.currentStep--;
  }


  onSubmit(){
    const formValues = this.requisicionForm2.getRawValue();

    // Estructuramos el objeto como lo necesitas
    const requisicionData = {
      requisicionInstructor: {
        usuario: formValues.usuario,
        nombre_del_solicitante: formValues.nombre_del_solicitante,
        puesto_del_solicitante: formValues.puesto_del_solicitante,
        region_solicitante: formValues.region_solicitante,
        tematica_solicitada: formValues.tematica_solicitada,
        num_vacantes: formValues.num_vacantes,
        localidad_impartira: formValues.localidad_impartira,
        num_participantes: formValues.num_participantes,
        horarios_dias_requeridos: formValues.horarios_dias_requeridos,
        motivo_del_requerimiento_cliente: formValues.motivo_del_requerimiento_cliente,
        honorario_a_ofrecer: formValues.honorario_a_ofrecer
      },
      requisicionInstructor2: {
        escolaridad_minima: formValues.escolaridad_minima,
        sexo: formValues.sexo,
        requiere_dominio_idiomas: formValues.requiere_dominio_idiomas,
        anios_experiencia: formValues.anios_experiencia,
        principales_temas: formValues.principales_temas
      }
    };
    
    // Ahora puedes mandar el objeto requisicionData como lo requieras

    this.messageSuccesful = true;
    return;
    this.requisicionesService.postRequisicionExterna(requisicionData).subscribe((res)=>{
      console.log(res)
    })

    
  }

  horarioChange(event: any) {
    const selectedValue = event.target.value;



    // Si el valor es "Otro", mostrar el textarea
    if (selectedValue === 'otro') {
      this.isOtroSelected = true;
      this.requisicionForm2.get('horarios_dias_requeridos')?.setValue(''); // Limpiar el campo si se selecciona 'Otro'
    } else {
      this.isOtroSelected = false;
      this.requisicionForm2.get('horarios_dias_requeridos')?.setValue(selectedValue); // Asignar el valor seleccionado al campo de honorarios
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.requisicionForm2.get(field);
    return control ? control.invalid && control.touched : false;
  }

}
