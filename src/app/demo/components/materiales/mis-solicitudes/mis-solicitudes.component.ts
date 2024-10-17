import { Component, OnInit } from '@angular/core';
import { MaterialesService } from '../services/materiales.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.scss'
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: any;
  isLoading: boolean = true;
  constructor (private materialesService:MaterialesService,
    private auth:AuthService, private router:Router,
    private confirmationService: ConfirmationService
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
        this.isLoading = false;
      }
    })
  }

  confirm1(event: Event, id) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'seguro de cancelar la solicitud para materiales?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'Si',
        accept: () => {
          // cancelar la solicitud
          this.cancelSolicitud(id)
        },
        reject: () => {
          return;
        }
    });
}


  goToDetalles(id){

    this.router.navigate([`/materiales/detalle/${id}`], {queryParams:{flag:'false'}})
  }

  
  cancelSolicitud(id){
    //cancelar solicitud

    const data = {
      idSolicitud:id,
      // fechaCerrado: '',
      cancelado: true,
    }
    const idSolicitud = Number(data.idSolicitud)

    this.materialesService.postSolicitudDetalle(data).subscribe((res)=>{

      this.materialesService.putEstatusSolicitud(idSolicitud,'cancelado').subscribe(()=>{
        // refrescar la pagina 
        window.location.reload()
      })
      // console.log(res)
      
    })
  }






}
