import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/components/auth/auth.service';
import { TicketsServiceService } from '../demo/components/uikit/services/tickets-service.service';
import { catchError, of, Subscription } from 'rxjs';
import { NotificationService } from '../demo/components/notifications/services/notificationUpdate.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    private updateSubscription: Subscription;


    model: any[] = [];
    user: any; // usuario actual
    notifications: any; // son las notificaciones
    badge1: any; // notificaciones de tipo 1 
    badge2: any; // notificaciones de tipo 2
    badge3: any; // notificaciones de tipo 3

    loading:boolean = false; // para el uso de notificacion
    badge5: any;
    badgeSum: any;
    badgeSum2: any;
    badge6: any;

    constructor(public layoutService: LayoutService,private authService:AuthService,
        private ticketService:TicketsServiceService, private notificationService: NotificationService
    ) { }
    

    ngOnInit() {

        this.user = this.authService.getUser();
        this.ticketService.getNotificatiosForUser(this.user.usuario).pipe(
            
        ).subscribe((res)=>{
            if (Array.isArray(res)) {
                this.notifications = res;
                this.loading = true;
                // console.log(res)
            } else {
                // console.warn('Received response is not an array, setting notifications to an empty array.');
                this.notifications = [];
                this.loading = true;
            }
            this.updateBadgeCount()
            this.menu();
            
            
        });

        this.updateSubscription = this.notificationService.updateObservable$.subscribe(() => {
            this.user = this.authService.getUser();
            this.ticketService.getNotificatiosForUser(this.user.usuario).pipe(
                
            ).subscribe((res)=>{
                if (Array.isArray(res)) {
                    this.notifications = res;
                    this.loading = true;
                    // console.log(res)
                } else {
                    // console.warn('Received response is not an array, setting notifications to an empty array.');
                    this.notifications = [];
                    this.loading = true;
                }
                this.updateBadgeCount()
                this.menu();
                
                
            });

          });
    }
    updateBadgeCount() {

            if (!this.notifications) {
                console.warn('No notifications available to update badges.');
                this.badge1 = [];
                this.badge2 = [];
                this.badge3 = [];
                // return;
            }
        this.badge1 = this.notifications?.filter(notification => notification.tipo === "1" && !notification.read_at);
        this.badge2 = this.notifications?.filter(notification => notification.tipo === "2" && !notification.read_at);
        this.badge3 = this.notifications?.filter(notification => notification.tipo === "3" && !notification.read_at);
        this.badge5 = this.notifications?.filter(notification => notification.tipo === "5" && !notification.read_at);
        this.badge6 = this.notifications?.filter(notification => notification.tipo === "6" && !notification.read_at);
            // se suman los dos badges para que sea uno solo
        this.badgeSum = this.badge2.length + this.badge5.length; // estas notificaciones son para el usuario que manda el ticket
        this.badgeSum2 = this.badge1.length + this.badge6.length; // estas notificaciones son para el administrador del ticket
        
        console.log(this.badgeSum);
        
      }
        menu(){
            // console.log(this.notifications?.length)

        this.model = [
            // {
            //     label: 'Usuario Actual',
            //     items: [
            //         { label: this.user.usuario, icon: 'pi pi-fw pi-user' }
            //     ]
            // },
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Menu',
                items: [
                    { label: 'Tickets', icon: 'pi pi-ticket',

                    items: [
                        {
                            label: 'Crear ticket',
                            icon: 'pi pi-plus',
                            routerLink: ['/tickets/crearTicket']
                        },
                        {
                            label: 'Mis Tickets',
                            icon: 'pi pi-plus',
                            routerLink: ['/tickets/crearTicket/misTickets'],
                            badge:this.badgeSum
                        },
                        {
                            label: 'Tickets Asignados',
                            icon: 'pi pi-ticket',
                            badge: this.badgeSum2,
                            items: [
                                {
                                    label: 'Por seleccionar',
                                    icon: 'pi pi-plus',
                                    routerLink: ['/tickets/crearTicket/ticketsTrabajados']
                                },
                                {
                                    label: 'seleccionados',
                                    icon: 'pi pi-plus',
                                    routerLink: ['/tickets/crearTicket/ticketsSeleccionados']
                                    
                                }

                            ]
                            // routerLink: ['/tickets/crearTicket/ticketsTrabajados']
                        },
                    ]


                     },
                    // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            // {
            {
                items: [
                    { label: 'Renta de laptops', icon: 'pi pi-desktop',

                    items: [
                        // {
                        //     label: 'Rentar',
                        //     icon: 'pi pi-desktop',
                        //     routerLink: ['/tickets/list']
                        // },
                        {
                            label: 'Rentar',
                            icon: 'pi pi-desktop',
                            routerLink: ['./renta/rentaLaptops']
                        },
                        {
                            label: 'MI Historial',
                            icon: 'pi pi-desktop',
                            routerLink: ['./renta/rentaLaptops/miHistorial']
                        },
                        {
                            label: 'Asignadas',
                            icon: 'pi pi-desktop',
                            routerLink: ['./renta/rentaLaptops/Asignadas']
                        },
                    ]
                     },
                ]
            },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            {
                label: 'Inicio de sesion',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    // {
                    //     label: 'Landing',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/landing']
                    // },
                    {
                        label: 'Sesion',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Cerrar Sesion',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login'],
                                command:() => this.endLocal()

                            },
                            // {
                            //     label: 'Error',
                            //     icon: 'pi pi-fw pi-times-circle',
                            //     routerLink: ['/auth/error']
                            // },
                            // {
                            //     label: 'Access Denied',
                            //     icon: 'pi pi-fw pi-lock',
                            //     routerLink: ['/auth/access']
                            // }
                        ]
                    },
                    // {
                    //     label: 'Crud',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/pages/crud']
                    // },
                    // {
                    //     label: 'Timeline',
                    //     icon: 'pi pi-fw pi-calendar',
                    //     routerLink: ['/pages/timeline']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/notfound']
                    // },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // },
                ]
            },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }

    endLocal(){
        this.authService.clearUser()
    }
}
