import { Component, Input, OnInit } from '@angular/core';
import printJS from 'print-js';
 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-responsiva',
  templateUrl: './responsiva.component.html',
  styleUrl: './responsiva.component.scss'
})
export class ResponsivaComponent  implements OnInit{

  constructor ( ) { }
  
  
  @Input() dataFromParent!: any;
  @Input() laptopsUsadas?:any;
  visible: boolean = false;
  ngOnInit(): void {

    // console.log( 'desde el hijo, componente responsiva', this.dataFromParent);
    // console.log('desde hijo', this.laptopsUsadas);

  }

  look(){
    this.visible = true;
  }


  printContent() {
    printJS({
      printable: 'print-section', // ID del elemento que deseas imprimir
      type: 'html',               // Tipo de contenido
      header: null,               // Opcional: encabezado de la impresión
    });
  }
  downloadPDF() {
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






