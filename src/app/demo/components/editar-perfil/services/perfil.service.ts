import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {



  constructor(private http: HttpClient) { }


  putPerfil(data){
    let url = 'https://visualmanagment.com/AppCGP/apis/usuario/putUser.php'
    const body = JSON.stringify({data}); // convierte un objeto en cadena
    return this.http.put(url, data);
  }
  putPassword(id,contrasenia){
    let url = 'https://visualmanagment.com/AppCGP/apis/usuario/putPassword.php'
    const body = JSON.stringify({id,contrasenia}); // convierte un objeto en cadena
    return this.http.put(url, body);
  }

  putTipoPerfil(id,tipoId){
    let url = 'https://visualmanagment.com/AppCGP/apis/usuario/putTipoUser.php'
    const body = JSON.stringify({id,tipoId})
    return this.http.put(url,body)
  }

  getEmailForUser(usuario: string): Observable<string> {
    return this.http.get(`https://visualmanagment.com/AppCGP/apis/usuario/getEmailForUser.php?usuario=${usuario}&timestamp=${new Date().getTime()}`, { responseType: 'text' });
  }
  


}
