import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


}
