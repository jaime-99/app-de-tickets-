import { Component, OnInit } from '@angular/core';
import { rentaService } from '../../services/renta.service';
import { RentaLaptop } from '../../interfaces/renta.interface';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-renta-detalle',
  templateUrl: './renta-detalle.component.html',
  styleUrl: './renta-detalle.component.scss'
})
export class RentaDetalleComponent implements OnInit {

  constructor ( private rentaService : rentaService, private activateRoute:ActivatedRoute) { }
  loading:boolean = false;
  renta:RentaLaptop
  rentaId:string;
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
  })
  }


}
