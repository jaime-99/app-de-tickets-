import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsiva',
  templateUrl: './responsiva.component.html',
  styleUrl: './responsiva.component.scss'
})
export class ResponsivaComponent  implements OnInit{
  @Input() dataFromParent!: any;
  @Input() laptopsUsadas?:any;
  visible: boolean = false;
  ngOnInit(): void {

    console.log( 'desde el hijo, componente responsiva', this.dataFromParent);
    console.log('desde hijo', this.laptopsUsadas);

  }



  look(){
    this.visible = true;
  }






}
