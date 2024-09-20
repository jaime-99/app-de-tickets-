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
      this.requiziciones = res
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

}
