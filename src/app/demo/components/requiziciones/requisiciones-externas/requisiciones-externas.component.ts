import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoriasRequisicionE} from './/interfaces/clases-externas'
import { RequizicionesService } from '../requiziciones.service';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
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
  usuario: any;
  constructor(private fb: FormBuilder, private requisicionesService:RequizicionesService,
    private authService:AuthService,
    private messageService: MessageService
  ) {
    this.requisicionForm2 = this.fb.group({
      usuario: [{ value: this.user['usuario'], disabled: true }, Validators.required],
        nombre_del_solicitante: ['Juan Pérez', Validators.required],
        puesto_del_solicitante: ['Coord. de ventas', Validators.required],
        region_solicitante: ['Bajio', Validators.required],
        tematica_solicitada: ['Matemáticas', Validators.required],
        num_vacantes: [2, Validators.required],
        localidad_impartira: ['Saltillo', Validators.required],
        num_participantes: ['0-10', Validators.required],
        horarios_dias_requeridos: ['Aun no especificado', Validators.required],
        motivo_del_requerimiento_cliente: ['', Validators.required],
        honorario_a_ofrecer: ['2000', Validators.required],
        fecha: [this.actualDate()],
        escolaridad_minima: ['bachillerato', Validators.required],
        sexo: ['Masculino', Validators.required],
        requiere_dominio_idiomas: [true, Validators.required],
        anios_experiencia: ['5-10', Validators.required],
        principales_temas: ['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.user
  }

  next(){
    //boton para darle siguiente
    this.currentStep++;
  }

  previous(): void {
    this.currentStep--;
  }

  get user():string{

    return this.authService.getUser()
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
        honorario_a_ofrecer: formValues.honorario_a_ofrecer,
        fecha:this.actualDate2()
      },
      requisicionInstructor2: {
        escolaridad_minima: formValues.escolaridad_minima,
        sexo: formValues.sexo,
        requiere_dominio_idiomas: formValues.requiere_dominio_idiomas,
        anios_experiencia: formValues.anios_experiencia,
        principales_temas: formValues.principales_temas
      }
    };

    // console.log(requisicionData)
    // return;

    if(this.requisicionForm2.valid){
      this.messageSuccesful = true;
      // return;
      this.requisicionesService.postRequisicionExterna(requisicionData).subscribe((res)=>{
        // console.log(res)
        
      })

    }else{
      this.show()
    }
    
    // Ahora puedes mandar el objeto requisicionData como lo requieras


    
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


  actualDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${day}/${month}/${year}`; // Devuelve en formato DD/MM/YYYY
}
  actualDate2() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}/${month}/${day}`; // Devuelve en formato DD/MM/YYYY
}

show(){
  //mostrar el mensaje de error 
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Faltan algunos datos, revise de nuevo' });

}

}