import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { RequizicionesService } from '../../requiziciones.service';
import { RequisicionExterna } from '../interfaces/requisicion-externa';

@Component({
  selector: 'app-externa-detalle',
  templateUrl: './externa-detalle.component.html',
  styleUrl: './externa-detalle.component.scss'
})
export class ExternaDetalleComponent implements OnInit{
  idRequisicion: string | number;
  loading:boolean = false;
  requisicionDetalle: RequisicionExterna;

  constructor (private activateRouter:ActivatedRoute, private auhtService:AuthService, private requizicionService:RequizicionesService) 
  {

  }
  ngOnInit(): void {
    
    this.activateRouter.params.subscribe((data)=>{
      this.idRequisicion = data['externaId']
      
      this.getRequisicionForid();
    })

  }


  getRequisicionForid(){
    this.requizicionService.getRequisicionExternaForId(this.idRequisicion).subscribe((res)=>{
      this.requisicionDetalle = res
      this.loading = true;
    })
  }


  downloadPDF(){
    window.print()
    return;
  }
}
