import { Component, OnInit } from '@angular/core';
import { rentaService } from '../services/renta.service';
import { RentaLaptop } from '../interfaces/renta.interface';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-historial-renta',
  templateUrl: './historial-renta.component.html',
  styleUrl: './historial-renta.component.scss'
})
export class HistorialRentaComponent  implements OnInit{
  rentas:RentaLaptop[];
  user : any;
  visible:boolean = false // es para que se muestre la minuta 
  loading:boolean = false;

  constructor (private rentaService:rentaService, private authService:AuthService, private router:Router) { }
  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.getRentas();
  }

  getRentas(){
    this.rentaService.getRentaForUser(this.user.usuario).pipe(
      delay(1000)
    ).subscribe((res)=>{
      this.rentas = res
      this.loading = true;
      // console.log(res)
    })

  }
 
  redirectTo(id){
    // mandar a detalles con el id 
    this.router.navigateByUrl(`renta/rentaLaptops/${id}`)

  }

  generarMinuta(){
    this.visible = true;

  }


}
