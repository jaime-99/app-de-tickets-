import { Component, OnInit } from '@angular/core';
import { rentaService } from '../../services/renta.service';
import { RentaLaptop } from '../../interfaces/renta.interface';
import { ActivatedRoute } from '@angular/router';
import { delay, Subject } from 'rxjs';
import { TicketsServiceService } from '../../../uikit/services/tickets-service.service';

@Component({
  selector: 'app-renta-detalle',
  templateUrl: './renta-detalle.component.html',
  styleUrl: './renta-detalle.component.scss'
})
export class RentaDetalleComponent implements OnInit {
  laptopsUsadas: any;

  constructor ( private rentaService : rentaService, private activateRoute:ActivatedRoute, private ticketService:TicketsServiceService) { }
  loading:boolean = false;
  renta:RentaLaptop // datos de la renta 
  rentaId:string; // es el id de la renta
  ngOnInit(): void {

    

    this.activateRoute.paramMap.subscribe(params=>{
      this.rentaId= params.get('id');
    });


    this.getRentaId()
  }


  getRentaId(){
  this.rentaService.getRentaForId(this.rentaId).pipe(
    delay(1000),
  ).subscribe((res)=>{
    this.renta = res
    // console.log(res)
    this.loading = true;
    this.EquiposParaRenta()
  })
  }

  // aqui sera un arreglo de los equipos de venta que se usaran en la renta
  EquiposParaRenta(){
    const laptops = this.renta?.EquiposParaRenta;

    if (!laptops) {
      this.laptopsUsadas = [];
      return;
    }
    
    const laptopArray = laptops.split(',').map((laptopString) => {
      // Separar las propiedades de cada objeto usando '-' como separador
      const parts = laptopString.split('-');
      
      // Crear un objeto con las propiedades extraídas
      const laptopObject = {
        marca: parts[0].replace('marca: ', '').trim(),
        NSerie: parts[1].replace('N.serie: ', '').trim(),
        equipo: parts[2].replace('#equipo: ', '').trim()
      };
  
      return laptopObject;
    });
  
    // console.log(laptopArray);
    this.laptopsUsadas = laptopArray
    
    // return laptopArray;
  }



  sendEmailRenta(){

    const data = {

      to:'sistemas.cgpgroup.mx',
      subject: 'Renta de laptops',
      body: `el usuario $ `      
    }

    this.ticketService.sendEmails

  }
}
