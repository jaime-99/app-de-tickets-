import { Component, OnInit } from '@angular/core';
import { rentaService } from '../services/renta.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.component.html',
  styleUrl: './renta.component.scss'
})
export class RentaComponent  implements OnInit{
  selectedPrograms: any[] = [];
  alert: boolean;

  constructor (private rentaService:rentaService, private fb: FormBuilder, private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { 

  }
  events: any[]; //linea del tiempo 
  selectedLaps:any;
  laptops:any
  programas : any[]

  rentaLaptopForm: FormGroup;

  isOtherSelected: boolean = false; // es para cuando se selecciona otra en la casilla de lugar
  selectedOption:string = 'ejemplo'


  ngOnInit(): void {

    this.events = [
      { status: 'Nombre', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Numero de laptops', date: '15/10/2020 14:00', icon: 'pi pi-check', color: '#673AB7' },
      { status: 'Fecha Inicio', date: '15/10/2020 16:15', icon: 'pi pi-check', color: '#FF9800' },
      { status: 'Fecha Fin', date: '15/10/2020 16:15', icon: 'pi pi-check', color: '#FF9800' },
      { status: 'Extras', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
  
  this.programas = [
    { name: 'Office', key: 'A' },
    { name: 'NX', key: 'M' },
    { name: 'ProModel', key: 'P' },
    { name: 'AutoCad', key: 'R' }
];
  this.laptops = []
  for (let i = 1 ; i < 11; i++) {
    this.laptops.push({ label:  i, value: i });
}


this.rentaLaptopForm = this.fb.group({
  nombre: ['', Validators.required],
  numeroComputadoras: [0, [Validators.required, Validators.min(1)]],
  diaInicio: ['', Validators.required],
  diaFin: ['', Validators.required],
  programas: [[]],
  comentarios: [''],
  mouse: [,Validators.required],
  extensiones: [],
  lugar:[],
  ubicacion:['Oficinas De Saltillo'],
  rentaUsuario:[],
  estatus:['abierto'],

});

this.checkFormStatus()

  }

  addCheckBox(event,programName){
    // console.log(programName)
    if (event.checked) {
      this.selectedPrograms.push(programName);
    }
  else {
      const index = this.selectedPrograms.indexOf(programName);
      if (index !== -1) {
        this.selectedPrograms.splice(index, 1);
      }
    }

    console.log(this.selectedPrograms)

    // console.log(this.selectedPrograms); // Puedes ver los programas seleccionados en la consola
  }

  confirm(event){
    // es para confirmas antes de enviar
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas seguro de rentar?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Si",
      rejectLabel: "No",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
          this.onSubmit()
      },

  })}

  onSubmit(){

    if(this.rentaLaptopForm.invalid){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Te faltan datos, intenta de nuevo' });
      // return;
      // this.alert = true;
    }

    this.rentaLaptopForm.patchValue({programas:this.selectedPrograms})
    this.checkFormStatus();

    // console.log(this.rentaLaptopForm.value)
    // return;
    // return;
    //?checar esta parte
    if(this.rentaLaptopForm.valid){
      this.rentaService.PostRenta(this.rentaLaptopForm.value).subscribe((res)=>{
        this.alert = true;
        // console.log(res)
      })
    }

  }

  onRadioButtonChange(value: string): void {
    // console.log(value)
    this.isOtherSelected = value === 'si'; // dice que si la variable otherSelected es igual al value si
    if (this.isOtherSelected) {
      this.rentaLaptopForm.get('ubicacion').setValue(''); // Limpiar el campo de texto si "otro" no está seleccionado
      
    }else{
      this.rentaLaptopForm.get('ubicacion').setValue('Oficinas de Saltillo'); // Limpiar el campo de texto si "otro" no está seleccionado

    }
    this.checkFormStatus();

  }


  checkFormStatus(): void {
    // Aquí es donde puedes actualizar los estados de los iconos del timeline según los valores de los form controls
    // Por ejemplo:
    const mouseValue = this.rentaLaptopForm.get('mouse')?.value;
    const lugarValue = this.rentaLaptopForm.get('lugar')?.value;

    this.events[0].color = this.rentaLaptopForm.get('nombre')?.value ? 'green' : 'red';
    this.events[1].color = this.rentaLaptopForm.get('numeroComputadoras')?.value ? 'green' : 'red';
    this.events[2].color = this.rentaLaptopForm.get('diaInicio')?.value ? 'green' : 'red';
    this.events[3].color = this.rentaLaptopForm.get('diaFin')?.value ? 'green' : 'red';
    this.events[4].color = (mouseValue && lugarValue) ? 'green' : 'red';

  }

  getMarkerClass(event: any): string {
    return event.color === 'green' ? 'complete' : 'incomplete';
  }

  

}
