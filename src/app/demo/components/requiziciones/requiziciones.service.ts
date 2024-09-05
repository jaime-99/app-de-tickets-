import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequizicionesService {

  constructor(private http:HttpClient) { }


  postRequisicion(data){
    let url = `https://visualmanagment.com/AppCGP/apis/RH/AddCrearRequisicion.php`;
    return this.http.post<any>(url, data);
} 


}
