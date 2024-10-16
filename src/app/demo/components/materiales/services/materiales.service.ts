import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  constructor(private http:HttpClient) { }

  //envio de solicitud
  postSolicitud(solicitud){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/addSolicitud.php`;
    return this.http.post<any>(url, solicitud);
} 
  postSolicitudDetalle(solicitudDetalle){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/addSolicitudDetalle.php`;
    return this.http.post<any>(url, solicitudDetalle);
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
//put para asignar a un usuario la solicitud 
  putAsignarSolicitud(id:number, asignada_a:string){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/putAsignada_a.php`
    const body  = {
      id:id,
      asignada_a:asignada_a
    }
    return this.http.put<any>(url,body);
} 
//put para cambiar el estatus 
  putEstatusSolicitud(id:number, estatus:string){
    let url = `https://visualmanagment.com/AppCGP/apis/materiales/putEstatus.php`
    const body  = {
      id:id,
      estatus:estatus
    }
    return this.http.put<any>(url,body);
}

//obtiene las solicitudes de solo un usuario
getSolicitudForUsuario(usuario){
  let url = `https://visualmanagment.com/AppCGP/apis/materiales/getSolicitudesForUser.php?usuario=${usuario}&timestamp=${new Date().getTime()}`
  return this.http.get<any>(url);
} 
// obtiene las solicitudes de asignada_a
getSolicitudForAsignada_a(asignada_a){
  let url = `https://visualmanagment.com/AppCGP/apis/materiales/getSolicitudesForAsignada_a.php?asignada_a=${asignada_a}&timestamp=${new Date().getTime()}`
  return this.http.get<any>(url);
} 
// obtiene las imagenes asignadas al id de la solicitud 
getArchivosForId(solicitud_id){
  let url = `https://visualmanagment.com/AppCGP/apis/materiales/getArchivosForId.php?solicitud_id=${solicitud_id}?&timestamp=${new Date().getTime()}`
  return this.http.get<any>(url);
} 
}
