import { Component, OnInit } from '@angular/core';
import { RequizicionesService } from '../requiziciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-requisiciones-solicitadas',
  templateUrl: './requisiciones-solicitadas.component.html',
  styleUrl: './requisiciones-solicitadas.component.scss'
})
export class RequisicionesSolicitadasComponent implements OnInit {

  requiziciones = []
  constructor (private requisicionesService:RequizicionesService,
    private router:Router,

  ) {}

  searchValue: string | undefined;

  ngOnInit(): void {
    this.getRequisiciones();
  }

  getRequisiciones(){
    this.requisicionesService.getRequisiciones().subscribe((res)=>{
      if(Array.isArray(res)){
      this.requiziciones = res
      }else{
        this.requiziciones = []
      }
    })
  }

  goToDetalles(id){
    
    this.router.navigateByUrl(`/requisicion/${id}`)
  }

  clear(table: Table){
    table.clear();
    this.searchValue = '' 
  }

  filterGlobal(){

  }


  get requisicionesAbierto(){
  return this.requiziciones.filter((r => r.estatus === 'abierto'))
  }
  get requisicionesCerrado(){
  return this.requiziciones.filter((r => r.estatus === 'cerrado'))
  }

}
