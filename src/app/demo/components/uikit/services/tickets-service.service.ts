import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject, Subject} from 'rxjs';
import { Area2, Categoria2 } from 'src/app/demo/interfaces/area-interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsServiceService {
  private ticketsCache$ = new BehaviorSubject<any>(null);

  private ticketCreatedSource = new Subject<void>();
    ticketCreated$ = this.ticketCreatedSource.asObservable();


  private apiUrl = 'https://visualmanagment.com/AppCGP/'; // Cambia esta URL a la ubicación real de tu script PHP
  

  constructor(private http: HttpClient) { }

  insertTickets(ticketData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const apiUrl = 'https://visualmanagment.com/AppCGP/apis/crearTickets/insertTickets.php'; // Cambia esta URL a la ubicación real de tu script PHP
    return this.http.post<any>(apiUrl, ticketData, { headers });
  }

  getAreas():Observable<Area2[]>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/usuario/getAreas.php?&timestamp=${new Date().getTime()}`);
  }

  getCategorias():Observable<Categoria2[]>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/crearTickets/getCategorias.php?&timestamp=${new Date().getTime()}`)
  }

  getEmailsForArea(area):Observable<any>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/usuario/getEmailForArea.php?area=${area}`)
  }
  sendEmails(data){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const apiUrl = 'https://visualmanagment.com/AppCGP/apis/emails/send_test_email.php'
    return this.http.post<any>(apiUrl, data, {headers})
  }

  getTicketsForUser(usuario): Observable<any> {
    const url = `https://visualmanagment.com/AppCGP/apis/crearTickets/getTicketsForUser.php?nombre_usuario=${usuario}&timestamp=${new Date().getTime()}`;
    return this.http.get<any>(url);
  }


  getTicketForId(id):Observable<any>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/crearTickets/getTicketForId.php?id=${id}&timestamp=${new Date().getTime()}`)
  }

  getTicketsForId(ticketId: string): Observable<any> {
    // Verificar si ya hay datos en caché
    const cachedTickets = this.ticketsCache$.getValue();
    if (cachedTickets && cachedTickets.id === ticketId) {
      return this.ticketsCache$.asObservable();
    } else {
      const url = `https://visualmanagment.com/AppCGP/apis/crearTickets/getTicketForId.php?id=${ticketId}`;
      return this.http.get<any>(url).pipe(
        tap(res => this.ticketsCache$.next(res))
      );
    }
  }
  clearCache() {
    this.ticketsCache$.next(null);
  }

  getTicketForAreaId(para_area):Observable<any>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/crearTickets/getTicketsForIdArea.php?para_area=${para_area}&timestamp=${new Date().getTime()}`)
  }

  putTicket(id,trabajadoPor){
    let url = 'https://visualmanagment.com/AppCGP/apis/crearTickets/putTrabajadoPor.php'
    const body = JSON.stringify({ id, trabajadoPor }); // convierte un objeto en cadena
    return this.http.put(url, body);
  }
  putTicketEstatus(id,estatus){
    let url = 'https://visualmanagment.com/AppCGP/apis/crearTickets/putEstatusProceso.php'
    const body = JSON.stringify({ id,estatus }); // convierte un objeto en cadena
    return this.http.put(url, body);
  }

  getTrabajadoPor(trabajadoPor):Observable<any>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/crearTickets/getTicketsForTrabajadoPor.php?trabajadoPor=${trabajadoPor}&timestamp=${new Date().getTime()}`)
  }

  ticketCreated() {
    this.ticketCreatedSource.next(); //checar que hace
  }

  postTicketDetalle(ticketData:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const apiUrl = 'https://visualmanagment.com/AppCGP/apis/crearTickets/addDetalleTicket.php'; // Cambia esta URL a la ubicación real de tu script PHP
    return this.http.post<any>(apiUrl, ticketData, { headers });
  }

  // se actualiza el ticket a cerrado y se coloca comentario2 si se soluciono o no
  putTicketCerrar(id,comentario2,solucionado){
    let url = `https://visualmanagment.com/AppCGP/apis/crearTickets/putTicketCerrado.php`;
    const body = JSON.stringify({ id, comentario2,solucionado}); // convierte un objeto en cadena
    return this.http.put(url, body);
  }

  //?empieza notificaciones
  addNotification(data){
    const url = 'https://visualmanagment.com/AppCGP/apis/crearTickets/addNotification.php';
    return this.http.post<any>(url,data);
  }
  getusuariosForArea(area):Observable<any>{
    return this.http.get<any>(`https://visualmanagment.com/AppCGP/apis/usuario/getUsersForArea.php?area=${area}&timestamp=${new Date().getTime()}`)
  }

  //?termina notificaciones
}
