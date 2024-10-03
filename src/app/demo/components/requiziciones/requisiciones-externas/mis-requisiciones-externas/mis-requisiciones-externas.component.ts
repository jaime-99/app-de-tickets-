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

  constructor (private authService:AuthService, private requisicionService:RequizicionesService,
    private router:Router
  ) { }
  private nombreUsuario = this.authService.getUser()

  ngOnInit(): void {
    this.getRequisiciones2ForUsuario()
  }

  getRequisiciones2ForUsuario(){
    this.requisicionService.getRequisicionForUsuarioExterna('usuario123').subscribe((res)=>{
      console.log(res)

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

    this.router.navigateByUrl(`/requisicion/externas/${idExterna}`)
  }

  clear(table: Table){
    table.clear();
    this.searchValue = '' 
  }




}
