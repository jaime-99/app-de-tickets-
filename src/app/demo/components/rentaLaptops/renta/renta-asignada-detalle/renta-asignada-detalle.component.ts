import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rentaService } from '../../services/renta.service';
import { Computadora, RentaLaptop } from '../../interfaces/renta.interface';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { debounceTime, delay } from 'rxjs';
import { PerfilService } from '../../../editar-perfil/services/perfil.service';

@Component({
  selector: 'app-renta-asignada-detalle',
  templateUrl: './renta-asignada-detalle.component.html',
  styleUrl: './renta-asignada-detalle.component.scss'
})
export class RentaAsignadaDetalleComponent implements OnInit {
  rentaId: string;
  rentaDetail: any;
  computadoras:Computadora[]; // es el arreglo de todas las computadoras
  computadoraSelect:any; // es la computadora que se selecciona 
  computerArray: number[] = []; // es el arreglo que se creara dependiendo de numLaptops
  numLaptops: any; // es el numero de laptops que escogio 
  selectLaptops: FormControl[]  = [];
  selcciones = []
  loading:boolean = false;
  emailUserRenta: string;

  constructor ( private activateRoute :ActivatedRoute,
     private rentaService:rentaService,
      private messageService: MessageService,
    private router:Router,
    private perfilService:PerfilService
  ) {

    // this.selectLaptops = this.computerArray.map(() => new FormControl());


  }
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params =>{
      const id = params.get('id')
      this.rentaId = id

      this.getRentaForId()


    })

  }

  getRentaForId(){

    if(this.rentaId === undefined || null){
      return;
    }

    this.rentaService.getRentaForId(this.rentaId).pipe(
      delay(1000),
    ).subscribe((res)=>{
      this.loading = true;
      // console.log( 'renta', res)
      this.rentaDetail = res
      this.numLaptops = this.rentaDetail.numeroComputadoras
      this.getLaptopsNames()
      this.getEmailForUser()


      // console.log(this.numLaptops)
    })

  }

  getLaptopsNames() {
    // Obtener las laptops y sus nombres
    this.rentaService.getComputadoras().subscribe((res) => {
      this.computadoras  = res.map((computer) =>({
        ...computer,
        combinedValue: `marca: ${computer.marca} - N.serie: ${computer.No_serie}- #equipo: ${computer.equipo}`
        
      }))


      this.generateComputerArray()
    });  
  }
  generateComputerArray() {
    const numComputadoras = parseInt(this.numLaptops,10);
    
    if (!isNaN(numComputadoras) && numComputadoras > 0) {
      this.computerArray = Array(numComputadoras).fill(0).map((x, i) => i);
      this.selectLaptops = this.computerArray.map(() => new FormControl());

    } else {
      this.computerArray = [];
    }
  }
 
  //validar el dropdown
  validateDropdowns(): boolean {
    return this.selectLaptops.every(control => control.value !== null && control.value !== '');
  }

  handleSelectionChange(event: any, index: number) {
    const seleccion = event.value;
    // this.selcciones[index] = seleccion;
    if (this.selcciones.includes(seleccion)) {  
      // Mostrar un mensaje de error o realizar alguna acción
      // console.error('Esta opción ya ha sido seleccionada.');
      this.messageService.add({ severity: 'error', summary: 'Error', 
        detail: 'Esta laptop ya se ha seleccionado, selecciona otra diferente' });

      // Revertir la selección (opcional)
      this.selectLaptops[index].setValue(null);
    } else {
      // Si la selección es única, agregarla al arreglo de selecciones
      this.selcciones[index] = seleccion;
    }
    // console.log('Nueva selección:' ,event.value);
    // console.log(this.selcciones)

  }

  //enviar los equipos, actualiza la tabla en la columna equiposParaRenta
  sendEquipos(){

    if(this.validateDropdowns()){
      this.rentaService.putComputersUse(this.rentaId,this.selcciones,'Cerrado').subscribe((res)=>{
        this.sendEmailToUser()
        this.router.navigateByUrl('renta/rentaLaptops/Asignadas')

      })
    }else{
      // console.error('faltan');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Te faltan laptops de seleccionar' });
    }
  }

  sendEmailToUser(){
    const data = {
      to: `${this.emailUserRenta}`,
      subject: 'renta Aprobada',
      body: `
      Hola <strong>${this.rentaDetail.rentaUsuario}

      Nos complace informarte que tu renta con el ID <strong>${this.rentaDetail.id} ha sido aprobada.

      Detalles de la renta:
      
          Fecha de inicio: ${this.rentaDetail.diaInicio}
          Fecha de fin: ${this.rentaDetail.diaFin}
      

      Para ver mas detalles, por favor visita: https://plataformacgp.cgpgroup.mx


      Saludos,El equipo de CGP
    `
    }

    this.rentaService.sendEmail(data).subscribe((res)=>{
      // console.log(res)
    })
  }


  getEmailForUser(){
    this.perfilService.getEmailForUser(this.rentaDetail.rentaUsuario).subscribe((res)=>{

      this.emailUserRenta = res
      // console.log(this.emailUserRenta)
    })
  }
}
