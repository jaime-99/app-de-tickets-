import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class rentaService {
    constructor(private http:HttpClient) { }
    


    PostRenta(data){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let url = `https://visualmanagment.com/AppCGP/apis/renta/postRenta.php`;
        return this.http.post<any>(url, data ,{ headers });

    }   
    //devuelve todas las rentas que hizo el usuario
    getRentaForUser(rentaUsuario){
        let url = `https://visualmanagment.com/AppCGP/apis/renta/getRentasForUser.php?rentaUsuario=${rentaUsuario}&timestamp=${new Date().getTime()}`;
        return this.http.get<any>(url)
    }

    // devolvera una renta individal con el id que le pasaemos
    getRentaForId(id){
        let url = `https://visualmanagment.com/AppCGP/apis/renta/getRentaForId.php?id=${id}&timestamp=${new Date().getTime()}`
        return this.http.get<any>(url)
    }

    getAllRentas(){
        let url = `https://visualmanagment.com/AppCGP/apis/renta/AllRentas.php?timestamp=${new Date().getTime()}`;
        return this.http.get<any>(url)
    }

    //obtiene todas las computadoras que hay en la BD
    getComputadoras(){
        let url = `https://visualmanagment.com/AppCGP/apis/renta/getAllComputadoras.php`;
        return this.http.get<any>(url)
    } 
    
    // sera un put a la tabla de renta para agregar al campo de computadoras que se usaran
    putComputersUse(id,EquiposParaRenta,estatus):Observable<any>{
        let url = `https://visualmanagment.com/AppCGP/apis/renta/putRentaComputadorasUsaran.php`;
        const body = JSON.stringify({ id, EquiposParaRenta,estatus }); // convierte un objeto en cadena
        return this.http.put(url,body).pipe(
            catchError(error =>{
                return throwError(error)
            })
        )
    }

    sendEmail(data){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const apiUrl = 'https://visualmanagment.com/AppCGP/apis/emails/send_test_email.php'
        return this.http.post<any>(apiUrl, data, {headers})
      }

    
}


