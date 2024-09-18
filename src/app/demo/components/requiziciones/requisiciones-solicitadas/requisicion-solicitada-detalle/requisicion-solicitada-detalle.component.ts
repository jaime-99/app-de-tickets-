import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequizicionesService } from '../../requiziciones.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-requisicion-solicitada-detalle',
  templateUrl: './requisicion-solicitada-detalle.component.html',
  styleUrl: './requisicion-solicitada-detalle.component.scss'
})
export class RequisicionSolicitadaDetalleComponent implements OnInit {
  requisicion: any;
  constructor (private activateRouter:ActivatedRoute,
    private requisicionesService:RequizicionesService
  ) {}
  requisicionId:any;

  ngOnInit(): void {
    
    this.activateRouter.paramMap.subscribe(params=>{
      this.requisicionId= params.get('id');
    });

    this.getRequisicionForId();
  }

  getRequisicionForId(){
    this.requisicionesService.getRequisicionForId(this.requisicionId).subscribe((res)=>{
      this.requisicion = res
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
}
