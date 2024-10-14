import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequizicionesService } from '../../requiziciones.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';


import { ConfirmationService } from 'primeng/api';
import { HabilidadesRequeridasComponent } from '../../habilidades-requeridas/habilidades-requeridas.component';

@Component({
  selector: 'app-requisicion-solicitada-detalle',
  templateUrl: './requisicion-solicitada-detalle.component.html',
  styleUrl: './requisicion-solicitada-detalle.component.scss'
})
export class RequisicionSolicitadaDetalleComponent implements OnInit, AfterViewInit  {
  requisicion: any;
  constructor (private activateRouter:ActivatedRoute,
    private requisicionesService:RequizicionesService,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    private location:Location
  ) {}
  ngAfterViewInit(): void {

  }
  requisicionId:any;
  loading:boolean = false;

  @ViewChild('tablaPrincipal', { static: false }) tablaPrincipal: any; // Referencia a la tabla principal
  @ViewChild(HabilidadesRequeridasComponent, { static: false }) habilidadesRequeridasComponent: HabilidadesRequeridasComponent; // Referencia al componente hijo

  ngOnInit(): void {
    
    this.activateRouter.paramMap.subscribe(params=>{
      this.requisicionId= params.get('id');
    });

    this.getRequisicionForId();
  }

  getRequisicionForId(){
    this.requisicionesService.getRequisicionForId(this.requisicionId).subscribe((res)=>{

      this.requisicion = res
      this.loading = true;
    })
  }

  downloadPDF() {

   
    window.print();
    return
    const printSection = document.getElementById('print-section');
  
    if (printSection) {
      html2canvas(printSection, {useCORS:true}).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('document.pdf');
      });
    }
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




printSection() {
  const printContent = this.tablaPrincipal.nativeElement.outerHTML; // Obtener tabla principal
  const habilidadesContent = this.habilidadesRequeridasComponent 
    ? this.habilidadesRequeridasComponent.getInnerHTML() // Obtener tabla de habilidades
    : '<p>No se encontraron habilidades</p>'; // Mensaje si no hay contenido de habilidades

  const windowPrint = window.open('', '', 'width=900,height=650');
  windowPrint.document.write('<html><head><title>Imprimir Requisición</title>');
  windowPrint.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primeicons@4.1.0/primeicons.css">');  // Estilos opcionales
  windowPrint.document.write('</head><body>');
  
  // Incluir el contenido de la tabla principal
  windowPrint.document.write(printContent);

  // Incluir el contenido de `app-habilidades-requeridas`
  windowPrint.document.write('<br><h4>Habilidades Requeridas:</h4>');
  windowPrint.document.write(habilidadesContent);

  windowPrint.document.write('</body></html>');
  windowPrint.document.close();
  windowPrint.focus();
  windowPrint.print();
}

goBack(){
  this.location.back();
}

putEstatus(){
  //se cambiara el estatus y se enviara el id y si el estatus debe ser abierto o cerrado

  const id = Number(this.requisicionId)

  this.requisicionesService.putEstatus(id,'cerrado').subscribe((res)=>{
    // console.log(res)
    window.location.reload();
  })
}



}
