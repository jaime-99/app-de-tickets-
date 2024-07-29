import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from '../uikit/services/tickets-service.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  user:any;
  notificaciones: any;

  constructor (private ticketService:TicketsServiceService, private authService:AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getNotifications();

  }

  getNotifications(){

    this.ticketService.getNotificatiosForUser(this.user.usuario).subscribe((res)=>{
      this.notificaciones = res 
    })


    
    
  }
  
  readMessage(){

  }

  search(){
    
  }
}
