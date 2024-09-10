import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilidades-requeridas',
  templateUrl: './habilidades-requeridas.component.html',
  styleUrl: './habilidades-requeridas.component.scss'
})
export class HabilidadesRequeridasComponent implements OnInit {

  @Input() dataHabilidades: any;


  constructor () {}
  ngOnInit(): void {

    console.log(this.dataHabilidades)

  }

}
