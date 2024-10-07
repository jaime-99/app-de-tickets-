import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RequizicionesService } from '../../requiziciones.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todas-externas',
  templateUrl: './todas-externas.component.html',
  styleUrl: './todas-externas.component.scss'
})
export class TodasExternasComponent implements OnInit {
  requisicionesExternas: any;
  searchValue: string;
  constructor (private authService :AuthService,
    private requizicionesService:RequizicionesService,
    private router:Router
  ) 
  {}
  usuario:any;
  loading:boolean = true;
  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    this.requisicionesE();


  }

  requisicionesE(){
    //obtener todas las requisiciones externas
    this.requizicionesService.getAllExternas().subscribe((res)=>{

      if(Array.isArray(res)){
        this.requisicionesExternas = res
        this.loading = false;
        // console.log(res)
      }else{
        this.requisicionesExternas = [];
      }
    })
  }

  
  clear(table: Table){
    table.clear();
    this.searchValue = '' 
  }

  goToDetalles(idExterna){

    this.router.navigateByUrl(`/requisicion/externas/${idExterna}`)
    
  }

}
