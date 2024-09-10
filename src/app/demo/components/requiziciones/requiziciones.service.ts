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

  getRequisiciones(){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisiciones.php`
    return this.http.get<any>(url)
  }
  getRequisicionForId(id){
    const url = `https://visualmanagment.com/AppCGP/apis/RH/getRequisicionForId.php?id=${id}`
    return this.http.get<any>(url)
  }


}
