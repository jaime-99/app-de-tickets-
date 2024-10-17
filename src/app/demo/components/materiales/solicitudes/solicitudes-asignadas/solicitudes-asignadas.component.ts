import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { MaterialesService } from '../../services/materiales.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-solicitudes-asignadas',
  templateUrl: './solicitudes-asignadas.component.html',
  styleUrl: './solicitudes-asignadas.component.scss'
})
export class SolicitudesAsignadasComponent implements OnInit {

  solicitudesAsignadas = [];
  usuario:any;
  loading = true;
  loading2 = true;
  searchValue = '';
  constructor (
    private authService:AuthService,
    private materialService:MaterialesService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    // private location:Location
    

  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    this.getSolicitudes();

  }


  getSolicitudes(){

    // este serian las solicitudes que digan asiganada_a
    this.materialService.getSolicitudForAsignada_a(this.usuario.usuario).subscribe((res)=>{
      if(Array.isArray(res)){

        this.solicitudesAsignadas = res
        this.loading = false;
        this.loading2 = false;
      }else{
        this.solicitudesAsignadas = [];
        this.loading = false;
        this.loading2 = false;
      }
    })
  }

  goToDetalles(id){

    this.router.navigate([`/materiales/detalle/${id}`], { queryParams: { flag: true } });

  }

  clear(table:Table){
    table.clear();

    this.searchValue = ''


  }

  solicitudesForEstatus(estatus){
    // console.log(this.solicitudesAsignadas)

    if(estatus ==='asignada'){
      return this.solicitudesAsignadas.filter(a => a.estatus === 'asignada')
    }
    if(estatus ==='cerrado'){
      return this.solicitudesAsignadas.filter(a => a.estatus === 'cerrado')
    }
    if(estatus ==='cancelado'){
      return this.solicitudesAsignadas.filter(a => a.estatus === 'cancelado')
    }
    return 'a'
  }


  volver(){

  }

  // es para ver si confirmo el cerrar la solicitud
  confirm(event: Event,id:any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro de cerrar la solicitud?.',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check mr-1',
        rejectIcon: 'pi pi-times mr-1',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
          
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'has cerrado la solicitud', life: 3000 });
            this.materialService.putEstatusSolicitud(id,'cerrado').subscribe(()=>{

              window.location.reload();
            })
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechazado', life: 3000 });
            return;
            
        }
    });
}


}
