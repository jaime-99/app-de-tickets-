import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MaterialesService } from '../services/materiales.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
//AQUI iran todas las solicitudes asignadas 
export class SolicitudesComponent implements OnInit {
  //seran todas las solicitudes
  solicitudes: any; // todas las solicitudes
  isLoading:boolean = true;
  isLoading2 = true;
  searchValue:string = ''
  // son las solicitudes que se veran por estatus
  solicitudesForE = []
  isLoading4: boolean = true;
  isLoading3: boolean = true;

  constructor (private authService:AuthService,
  private materialesService:MaterialesService,
private router:Router) {}
  ngOnInit(): void {
    this.getSolicitudes();
    // this.solicitudesForEstatus()
  }


  getSolicitudes(){
    this.materialesService.getSolicitudes().subscribe((res)=>{
      this.solicitudes = res
      console.log(this.solicitudes)
      this.isLoading = false;
      this.isLoading2 = false;
      this.isLoading3 = false;
      this.isLoading4 = false;
      // console.log(res)
    })
  }


  // ir a detalles de las solicitudes
  goToDetalles(id){

    this.router.navigateByUrl(`/materiales/detalle/${id}`)

  }

  solicitudesForEstatus(estatus?){

    return this.solicitudes.filter(solicitud => solicitud.estatus === estatus);
  }

  //delete table
  clear(table:Table){

    table.clear();
    this.searchValue = ''
  }


  
}
