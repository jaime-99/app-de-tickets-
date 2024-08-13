import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../uikit/services/tickets-service.service';
import { AuthService } from '../auth/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { NotificationService } from './services/notificationUpdate.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  user:any;
  notificaciones: any[];
  notificacionesLeidas: any[];
  loading = false;

  constructor (private ticketService:TicketsServiceService, private authService:AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private notificationsService:NotificationService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getNotifications();

  }

  getNotifications(){
    
    this.ticketService.getNotificatiosForUser(this.user.usuario).subscribe((res)=>{
      if(Array.isArray(res)){

        this.notificaciones = res.filter(noti => noti.read_at != null);
        this.notificacionesLeidas = res.filter(noti=>noti.read_at === null)

        this.loading = true;
      }else{
        this.notificaciones = []
      }
    })
  }
  
  readMessage(event,notificacion){

      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Quieres marcar el mensaje como leido?',
          header: 'Confirmacion',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
            this.ticketService.putNotification(notificacion.id,this.getFormattedCurrentDate()).subscribe(()=>{
              // console.log(res)
              
              this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'mensaje dado por visto' });
              this.getNotifications()
              this.notificationsService.triggerUpdate(); // Notificar a otros componentes

            })

          },
          reject: () => {
              // this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: '', life: 3000 });
              return;
          }
      });
  }


  search(table: Table, event: Event){
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


   getFormattedCurrentDate(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  deleteMessage(notificacion?){

  }
}
