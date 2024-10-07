import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  constructor(private http:HttpClient) { }

  //envio de solicitud
  postSolicitud(data){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/addSolicitud.php`;
    return this.http.post<any>(url, data);
} 
  //obtener todas las solicitudes enviadas
  getSolicitudes(){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/solicitudesEnviadas.php?timestamp=${new Date().getTime()}`
    return this.http.get<any>(url);
} 
  //obtiene una sola solicitud por el id proporcionado
  getSolicitudForId(id){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/getSolicitudForId.php?id=${id}&timestamp=${new Date().getTime()}`
    return this.http.get<any>(url);
} 
//obtiene las solicitudes con el estatus proporcionado
  getSolicitudForEstatus(estatus){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/getSolicitudForEstatus.php?estatus=${estatus}&timestamp=${new Date().getTime()}`
    return this.http.get<any>(url);
} 
}
