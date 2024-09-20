import { Component, Input, OnInit } from '@angular/core';
import { requsiciones } from '../interfaces/requisicion.interface';

@Component({
  selector: 'app-habilidades-requeridas',
  templateUrl: './habilidades-requeridas.component.html',
  styleUrl: './habilidades-requeridas.component.scss'
})
export class HabilidadesRequeridasComponent implements OnInit {

  @Input() dataHabilidades: requsiciones;


  constructor () {}
  ngOnInit(): void {

    // console.log('habilidades requeridas',this.dataHabilidades)

  }

}
