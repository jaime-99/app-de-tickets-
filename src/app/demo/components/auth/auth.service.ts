import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://visualmanagment.com/AppCGP/'; // Cambia esta URL a la ubicación real de tu script PHP

  constructor(private http: HttpClient) { }
  //metodo para obtener los usuarios
  getUsers(): Observable<any> {
    return this.http.get<any>('https://visualmanagment.com/AppCGP/apis/usuario/getUser.php');
  }

  // Método para crear un nuevo usuario
  createUser(usuario): Observable<any> 
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://visualmanagment.com/AppCGP/apis/usuario/crearUsuario.php',usuario, {headers});
  }
  //metodo para ver si un usuario existe con el usuario y contra
  login(username: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find((u: any) => u.usuario === username && u.contrasenia === password);
        return !!user;
      })
    );
  }

  login2(usuario: string, contrasenia: string): Observable<any> {
    const url1 = `https://visualmanagment.com/AppCGP/apis/usuario/getUserForUser.php`
    const url = `${url1}?usuario=${usuario}&contrasenia=${contrasenia}&timestamp=${new Date().getTime()}`;
    return this.http.get<any>(url);
  }

  // Método para guardar la información del usuario en localStorage
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
  clearUser(): void {
    localStorage.removeItem('user');
  }


  checkAuthStatus(){
    //para verificar si el usuario esta con la sesion iniciada
    
  }



}
