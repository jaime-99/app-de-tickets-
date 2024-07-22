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
  visible:boolean = false // es para que se muestre la responsiva
  loading:boolean = false; // es para que cargue el spinner
  rentaDetalles: RentaLaptop; // es el objeto de una sola renta
  laptopsUsadas:[] = []; // es el arreglo de las laptops que se usaran
  alert : boolean = false;

  constructor (private rentaService:rentaService, private authService:AuthService, private router:Router) { }
  ngOnInit(): void {
    this.user = this.authService.getUser()
    this.getRentas();
  }

  getRentas(){
    this.rentaService.getRentaForUser(this.user.usuario).pipe(
      delay(1000)
    ).subscribe((res)=>{
      this.loading = true;

      if(Array.isArray(res)){
        this.rentas = res
      }else{
        this.alert = true;
      }

        console.log(res)
    })

  }
 
  redirectTo(id){
    // mandar a detalles con el id 
    this.router.navigateByUrl(`renta/rentaLaptops/${id}`)

  }

  // para que se vea la responsiva en cuadro
  generarMinuta(id){

    this.visible = true;
    this.laptopsUsadas = []
    this.rentaService.getRentaForId(id).subscribe((res)=>{
      this.rentaDetalles = res 
      console.log(this.rentaDetalles)

      if(this.rentaDetalles.EquiposParaRenta === undefined || null){
        this.laptopsUsadas = []
        return;
        
      }
      const laptops = this.rentaDetalles.EquiposParaRenta;


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

      this.laptopsUsadas = laptopArray;
      // console.log(this.laptopsUsadas)
      
    })

  }


}
