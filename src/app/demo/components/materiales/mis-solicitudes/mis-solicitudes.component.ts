import { Component, OnInit } from '@angular/core';
import { MaterialesService } from '../services/materiales.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.scss'
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: any;
  isLoading: boolean = true;
  constructor (private materialesService:MaterialesService,
    private auth:AuthService, private router:Router
  ) {
    this.usuario = this.auth.getUser();
  }

  usuario:any;
  ngOnInit(): void {
    this.getSolicitudesForUsuario();
    

  }


  getSolicitudesForUsuario(){
    
    this.materialesService.getSolicitudForUsuario(this.usuario.usuario).subscribe((res)=>{

      if(Array.isArray(res)){

        setTimeout(()=>{
          this.solicitudes = res
          this.isLoading = false
        }, 1350)

      }else{
        this.solicitudes = []
        this.isLoading = true;
      }
    })
  }


  goToDetalles(id){

    this.router.navigate([`/materiales/detalle/${id}`], {queryParams:{flag:'false'}})
  }

  






}
