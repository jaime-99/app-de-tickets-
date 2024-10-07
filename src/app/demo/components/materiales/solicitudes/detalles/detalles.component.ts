import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MaterialesService } from '../../services/materiales.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit{
  visible:any;
  // es el id de la solicitud
  idSolicitud: string;
  solicitud: any;

  constructor (
    private authService:AuthService,
    private materialesService:MaterialesService,
    private activateRouter:ActivatedRoute
  ) {

    this.activateRouter.params.subscribe((solicitud)=>{
      this.idSolicitud = solicitud['id']
    })

  }

  ngOnInit(): void {
      
    this.getSolicitud();

  }


  getSolicitud(){
    this.materialesService.getSolicitudForId(this.idSolicitud).subscribe((res)=>{
      this.solicitud = res
      console.log(this.solicitud)
    })
  }

  //es para que sea visible el dialog
  showDialog() {
    this.visible = true;
}


// es para asignar la solicitud a alguien de materiales
asignar(){

}
}
