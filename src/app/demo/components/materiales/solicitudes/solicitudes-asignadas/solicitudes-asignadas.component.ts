import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MaterialesService } from '../../services/materiales.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-solicitudes-asignadas',
  templateUrl: './solicitudes-asignadas.component.html',
  styleUrl: './solicitudes-asignadas.component.scss'
})
export class SolicitudesAsignadasComponent implements OnInit {

  solicitudesAsignadas = [];
  usuario:any;
  loading = false;
  loading2 = false;
  searchValue = '';
  constructor (
    private authService:AuthService,
    private materialService:MaterialesService,

  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    this.getSolicitudes();

  }


  getSolicitudes(){

    this.materialService.getSolicitudForUsuario(this.usuario.usuario).subscribe((res)=>{
      this.solicitudesAsignadas = res
    })
  }

  goToDetalles(){

  }

  clear(table:Table){
    table.clear();


  }

  solicitudesForEstatus(estatus){

    if(estatus ==='asignada'){

      this.solicitudesAsignadas.filter(a => a.estatus === 'asignada')
      console.log(this.solicitudesAsignadas)

    }
    
  }



}
