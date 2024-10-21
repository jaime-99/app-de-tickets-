import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RequizicionesService } from '../../requiziciones.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-requisiciones-externas',
  templateUrl: './mis-requisiciones-externas.component.html',
  styleUrl: './mis-requisiciones-externas.component.scss'
})
export class MisRequisicionesExternasComponent implements OnInit {
  requisicionesExternas: any;
  isLoading = true;
  searchValue:string
  usuario :any

  constructor (private authService:AuthService, private requisicionService:RequizicionesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUser()
    this.getRequisiciones2ForUsuario()
  }

  getRequisiciones2ForUsuario(){
    this.requisicionService.getRequisicionForUsuarioExterna(this.usuario.usuario).subscribe((res)=>{
      // console.log(res)

      if (Array.isArray(res)) {
        this.requisicionesExternas = res; // Asignar el arreglo directamente
    } else {
        this.requisicionesExternas = []; // Si no es un arreglo, limpiar
    }
    
    if (res.message) {
        this.requisicionesExternas = []; // Limpiar si hay un mensaje de error
    }

    setTimeout(() => {
        this.isLoading = false;
    }, 350);  // delay
});
  }

  goToDetalles(idExterna){

    this.router.navigate([`/requisicion/externas/${idExterna}`], {queryParams: {flag:false}});

  }

  clear(table: Table){
    table.clear();
    this.searchValue = '' 
  }




}
