import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { requsiciones } from '../interfaces/requisicion.interface';

@Component({
  selector: 'app-habilidades-requeridas',
  templateUrl: './habilidades-requeridas.component.html',
  styleUrl: './habilidades-requeridas.component.scss'
})
export class HabilidadesRequeridasComponent implements OnInit {

  @Input() dataHabilidades: requsiciones;


  @ViewChild('habilidadesContent', { static: false }) habilidadesContent: ElementRef;


  constructor () {}
  ngOnInit(): void {

    // console.log('habilidades requeridas',this.dataHabilidades)

  }


  getInnerHTML(): string {
    return this.habilidadesContent
      ? this.habilidadesContent.nativeElement.innerHTML
      : '<p>Habilidades no disponibles</p>';
  }
}
