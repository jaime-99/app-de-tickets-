import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rentaService } from '../../services/renta.service';
import { Computadora, RentaLaptop } from '../../interfaces/renta.interface';
import { FormControl } from '@angular/forms';

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

  constructor ( private activateRoute :ActivatedRoute, private rentaService:rentaService) {

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

    this.rentaService.getRentaForId(this.rentaId).subscribe((res)=>{
      console.log( 'renta', res)
      this.rentaDetail = res
      this.numLaptops = this.rentaDetail.numeroComputadoras
      this.getLaptopsNames()


      console.log(this.numLaptops)
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
      console.error('Esta opción ya ha sido seleccionada.');
      // Revertir la selección (opcional)
      this.selectLaptops[index].setValue(null);
    } else {
      // Si la selección es única, agregarla al arreglo de selecciones
      this.selcciones[index] = seleccion;
    }
    console.log('Nueva selección:' ,event.value);
    console.log(this.selcciones)

  }

  //enviar los equipos, actualiza la tabla en la columna equiposParaRenta
  sendEquipos(){



  }
}
