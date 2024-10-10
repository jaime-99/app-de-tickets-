import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MaterialesService } from '../../services/materiales.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { set } from 'date-fns';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent implements OnInit{
  visible:any;
  // es el id de la solicitud
  idSolicitud: string;
  //es la solicitud con todos sus valores
  solicitud: any;
  // seran los usuarios de materiales solamente
  usuariosMateriales: any = [];
  usuario:any
  usuarioSeleccionado: string; // Variable para almacenar el usuario seleccionado
  loading = false;


  constructor (
    private authService:AuthService,
    private materialesService:MaterialesService,
    private activateRouter:ActivatedRoute,
    private messageService:MessageService,
    private location:Location
  ) {

    this.activateRouter.params.subscribe((solicitud)=>{
      this.idSolicitud = solicitud['id']
    })

  }

  ngOnInit(): void {
      
    this.getSolicitud();
    this.usuario = this.authService.getUser();
    

    this.authService.getUsers().subscribe((res)=>{
      this.usuariosMateriales = res.filter(usuario =>usuario.area==='Materiales'
        && usuario.usuario!== this.usuario.usuario
      )
      .map(usuario => usuario.usuario)
    }
  )

  }


  getSolicitud(){
    this.materialesService.getSolicitudForId(this.idSolicitud).subscribe((res)=>{
      this.solicitud = res

      setTimeout(()=>{
        this.loading = true;

      },1400)

      // console.log(this.solicitud)
    })
  }

  //es para que sea visible el dialog
  showDialog() {
    this.visible = true;
}


// es para asignar la solicitud a alguien de materiales
asignar(){

  // this.solicitud = this.idSolicitud
  //convertirlo a number
  const numero: number = Number(this.idSolicitud);

  const body = {
    id:numero,
    asignada_a:this.usuarioSeleccionado
  }


  if(body.id === undefined || body.asignada_a ===undefined){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falta seleccionar el usuario' });
    return;
    
  }else{

      // console.log('si tiene el usuario seleccionado')
    
    this.materialesService.putAsignarSolicitud(body.id,body.asignada_a).subscribe((res)=>{
      this.materialesService.putEstatusSolicitud(body.id,'asignada').subscribe((res)=>{
        window.location.reload();
        // console.log(res)
      });
    })


  }
}

tomarSolicitud(){
  // es por si yo mismo quiero agarrar la solicitud
  const idS:number = Number(this.idSolicitud )
  const data = {
    id: idS,
    asignada_a: this.usuario.usuario
  }


  this.materialesService.putAsignarSolicitud(data.id,data.asignada_a).subscribe();
  this.materialesService.putEstatusSolicitud(data.id,'asignada').subscribe();
  window.location.reload();


}

severity(estatus){

  if(estatus ==='abierto'){
    return 'success'
  }
  if (estatus ==='asignada'){
    return 'warning'
  }
  if (estatus ==='cerrado'){
    return 'danger'
  }

  return 'primary'

}

volver(){

  this.location.back();

}



obtenerNombreArchivo(url: string): string {
  return url.split('/').pop() || '';
}

}
