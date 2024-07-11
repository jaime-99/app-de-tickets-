import { Component, OnInit } from '@angular/core';
import { rentaService } from '../../services/renta.service';
import { RentaLaptop } from '../../interfaces/renta.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renta-asignada',
  templateUrl: './renta-asignada.component.html',
  styleUrl: './renta-asignada.component.scss'
})
export class RentaAsignadaComponent implements OnInit {
  rentaAbiertos: RentaLaptop[];
  rentaCerrados: RentaLaptop[];
  constructor (private rentaService:rentaService, private router:Router ) { }
  rentas:RentaLaptop[]
  loading:boolean = false;
  ngOnInit(): void {
    this.getRentas();
  }


  getRentas(){

    // this.rentaService.getAllRentas().subscribe(res=> this.rentas = res );

    this.rentaService.getAllRentas().subscribe((res)=>{
      this.rentas = res
      // console.log(this.rentas)
      this.getRentaAbierto()
      this.loading = true;
    })

    //coloca filter para que obtenga los de renta donde res.estatus === abierto
  }

  getRentaAbierto(){
    
    const rentaAbierto = this.rentas.filter(renta => renta.estatus === 'abierto');

    const rentaCerrados = this.rentas.filter(renta => renta.estatus==='cerrado');

    this.rentaCerrados = rentaCerrados;
    this.rentaAbiertos = rentaAbierto
    console.log(rentaAbierto)
  }

  goToDetail(id){
    // ir a detalles para asigar las laptops
    this.router.navigateByUrl(`renta/rentaLaptops/Asignadas/${id}`)
  }

  // ir a detalles que es el template que se comparte 
  goToDetail2(id){

    this.router.navigateByUrl(`renta/rentaLaptops/${id}`);
  }

  getSeverity(estatus){

    if(estatus==='Abierto') {
      return 'success'
    }else{
      return 'danger'
    }
  }

}
