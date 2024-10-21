import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequizicionesService {
  requisiciones = []
  

  constructor(private http:HttpClient) { }


  postRequisicion(data){
    let url = `https://visualmanagment.com/AppCGP/apis/RH/AddCrearRequisicion.php`;
    return this.http.post<any>(url, data);
} 
  // requisiciones internas
  getRequisiciones(){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisiciones.php?timestamp=${new Date().getTime()}`
    return this.http.get<any>(url)
  }
  getRequisicionForId(id){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisicionForId.php?id=${id}&timestamp=${new Date().getTime()}`
    return this.http.get<any>(url)
  }
  getRequisicionForUsuario(usuario){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisicionesForUsuario.php?usuario=${usuario}&timestamp=${new Date().getTime()}`
    return this.http.get<any>(url)
  }
  sendEmailRequisicion(data){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const apiUrl = 'https://visualmanagment.com/AppCGP/apis/emails/send_test_email.php'
    return this.http.post<any>(apiUrl, data, {headers})
  }
  putEstatus(id:number,estatus:string){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/putEstatus.php`;
    const body = {
      id:id,
      estatus:estatus
    }
    return this.http.put<any>(url,body)
  }

  // externas

  postRequisicionExterna(data){
    let url = `https://visualmanagment.com/AppCGP/apis/RH/AddCrearRequisicion2.php`;
    return this.http.post<any>(url, data);
} 
getRequisicionForUsuarioExterna(usuario){
  const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisicionesExternasForUsuario.php?usuario=${usuario}&timestamp=${new Date().getTime()}`
  return this.http.get<any>(url)
}
getRequisicionExternaForId(id){
  const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisicionExternaForId.php?id=${id}&timestamp=${new Date().getTime()}`
  return this.http.get<any>(url)
}
getAllExternas(){
  const url = `https://visualmanagment.com/AppCGP/apis/RH/getAllRequisicionesExternas.php?timestamp=${new Date().getTime()}`
  return this.http.get<any>(url)
}
//
putEstatusInstructor(requisicionInstructor_id:number,estatus:string){
  const url = `https://visualmanagment.com/AppCGP/apis/RH/putEstatusInstructores.php`;
  const body = {
    requisicionInstructor_id:requisicionInstructor_id,
    estatus:estatus
  }
  return this.http.put<any>(url,body)
}



}
