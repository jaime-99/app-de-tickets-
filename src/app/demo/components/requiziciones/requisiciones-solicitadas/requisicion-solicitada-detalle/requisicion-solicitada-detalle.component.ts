import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequizicionesService } from '../../requiziciones.service';

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
}
