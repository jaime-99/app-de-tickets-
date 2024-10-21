import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { RequizicionesService } from '../../requiziciones.service';
import { RequisicionExterna } from '../interfaces/requisicion-externa';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-externa-detalle',
  templateUrl: './externa-detalle.component.html',
  styleUrl: './externa-detalle.component.scss'
})


export class ExternaDetalleComponent implements OnInit{
  idRequisicion: string | number;
  loading:boolean = false;
  requisicionDetalle: RequisicionExterna;
  // es para ver si puede cerrar o no la requisicion de instructor
  flag: boolean;
  
  constructor (private activateRouter:ActivatedRoute, private auhtService:AuthService,
    private requizicionService:RequizicionesService,
    private confirmationService: ConfirmationService, 
    private router:Router,
    private location: Location) 
    {
      
    }
    @ViewChild('tablaPrincipal', { static: false }) tablaPrincipal: any; // Referencia a la tabla principal
  ngOnInit(): void {
    
    this.activateRouter.params.subscribe((data)=>{
      this.idRequisicion = data['externaId']
      
      this.getRequisicionForid();
    })

    this.activateRouter.queryParams.subscribe((param)=>{
      this.flag = param['flag'] === 'true'
    })

    

  }


  getRequisicionForid(){
    this.requizicionService.getRequisicionExternaForId(this.idRequisicion).subscribe((res)=>{
      this.requisicionDetalle = res
      this.loading = true;
    })
  }


  downloadPDF(){
    // window.print()
    // return;

    const printContent = this.tablaPrincipal.nativeElement.outerHTML; // Obtener tabla principal


    const windowPrint = window.open('', '', 'width=900,height=650');
  windowPrint.document.write(`<html><head><title>Solicitado (${this.requisicionDetalle.localidad_impartira})</title>`);
  windowPrint.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primeicons@4.1.0/primeicons.css">');  // Estilos opcionales
  windowPrint.document.write('</head><body>');
  
  // Incluir el contenido de la tabla principal
  windowPrint.document.write(printContent);


  windowPrint.document.write('</body></html>');
  windowPrint.document.close();
  windowPrint.focus();
  windowPrint.print();
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Cerrar la requisicion?',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel:'Si',
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.putEstatus();
        },
    });
}

putEstatus(){
  // para colocar la requisicion de instructores en cerrado 

  // llamar al servicio

  const data = {
    id : this.idRequisicion,
    estatus : 'cerrado'
  }

  const id2 = Number(data.id)

  this.requizicionService.putEstatusInstructor(id2,data.estatus).subscribe((res)=>{
    // recargar la pagina
    window.location.reload()
  })

}

goBack(){
  this.location.back();
}
}
