import { Component, OnInit } from '@angular/core';
import { RequizicionesService } from '../requiziciones.service';
import { AuthService } from '../../auth/auth.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mis-requisiciones-internas',
  templateUrl: './mis-requisiciones-internas.component.html',
  styleUrl: './mis-requisiciones-internas.component.scss'
})
export class MisRequisicionesInternasComponent implements OnInit {
  searchValue: string;
  constructor (private requisicionesService:RequizicionesService,
    private authService:AuthService,
    private router:Router

  ) {}
  requisciones:any// requisiciones por usuario
  usuario:any;
  isLoading = true;  // Inicialmente está cargando


  
  ngOnInit(): void {
    this.usuario = this.authService.getUser()
    this.getRequisiciones()

  }

  getRequisiciones(){

    this.requisicionesService.getRequisicionForUsuario(this.usuario.usuario).subscribe((res)=>{
      
      if(res && typeof res === 'object'){
        this.requisciones = [res]
        if(res.message){
          this.requisciones = [];
        }
      }else{
        this.requisciones = []
      }

      setTimeout(() => {
        this.isLoading = false;
      }, 350);  // delay
      

    })

  }

  clear(table: Table){
    table.clear();
    this.searchValue = '' 
  }

  goToDetalles(){
    

  }


}
