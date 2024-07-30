import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { TicketsServiceService } from '../demo/components/uikit/services/tickets-service.service';
import { AuthService } from '../demo/components/auth/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    user:any; 

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    notification = []; // notificaciones del usuario

    // se implementa el servicio de tickets en un lugar fuera de tickets,(checarlo)
    constructor(public layoutService: LayoutService, private tickets:TicketsServiceService, private authService:AuthService) { }
    ngOnInit(): void {

      this.user = this.authService.getUser()
      this.notifications()
        
    }

    

    notifications(){
        this.tickets.getNotificatiosForUser(this.user.usuario).subscribe((res)=>{
            if (Array.isArray(res)) {
                // console.log('tiene datos')
                this.notification = res.filter(notification => notification.read_at === null);
              } else {
                // console.log('no tiene datos')
                this.notification = []; // Asignar un arreglo vacío si res no es un arreglo
              }
            });
    }
}
