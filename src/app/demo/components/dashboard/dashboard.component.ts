import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth/auth.service';
import { TicketsServiceService } from '../uikit/services/tickets-service.service';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { identifierName } from '@angular/compiler';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
    user: any;
    nameFull:string;
    numTickets:any;
    numTicketsArea:any;
    para_area: number;
    ticketsEnviados: number = 0; // es para ver los tickts enviados
    ticketsPendientes: number = 0; // tickets pendientes desde la tabla 
    ticketsTerminados: number = 0;// tickets terminados desde la tabla 
    ticketsTotales:number = 0;
    constructor(private authService:AuthService, private productService: ProductService, public layoutService: LayoutService, private ticketsService
        :TicketsServiceService
    ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.user = this.authService.getUser(); //info usuario
        this.name()
        // this.ticketsCount()
        this.getTicketsCount();

        this.ticketsService.ticketCreated$.subscribe(() => {
            // Limpiar la caché y volver a cargar los datos
            localStorage.removeItem(`numTickets_${this.user.usuario}`); //pendiente
            localStorage.removeItem(`numTicketsArea_${this.para_area}`)
            this.ticketsCount();
        });

        setInterval(() => this.ticketsCount(), 60000); // Actualiza cada 60 segundos
        this.productService.getProductsSmall().then(data => this.products = data);
        
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        

        }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    name(){
        const name = this.user.nombre;
        const apellidoPaterno = this.user.apellido_paterno;
        const apellidoMaterno = this.user.apellido_materno;

        this.nameFull = name+ ' '+ apellidoPaterno + ' ' + apellidoMaterno;

        this.whatAreaIs(this.user.area)
    }

    ticketsCount(){
        
        const userKey = `numTickets_${this.user.usuario}`; // Genera una clave única para el usuario
        const cachedNumTickets = localStorage.getItem(userKey);
    
            this.ticketsArea()
        
        if ( cachedNumTickets !== null) {
            this.numTickets = cachedNumTickets;
            return; // Si hay datos en cache, no hacer la solicitud
        }

        this.ticketsService.getTicketsForUser(this.user.usuario).subscribe((res)=>{
            let numT = res.length;
            this.numTickets = numT
            if(res.length===undefined){ 
                this.numTickets = "0"
            }
            // Almacenar el resultado en localStorage
            localStorage.setItem(userKey, this.numTickets.toString());
        }, (error) => {
            // Maneja errores aquí si es necesario
            this.numTickets = "Error al cargar tickets";
        });

    }


    whatAreaIs(Area){

        switch (Area) {
          case 'Sistemas':
            this.para_area = 1;
            break;
          case 'Comercial':
            this.para_area = 2;
            break;
          case 'Administracion':
            this.para_area = 3;
            break;
          case 'Diseño':
            this.para_area = 4;
            break;
          case 'RH':
            this.para_area = 5;
            break;
          case 'Materiales':
            this.para_area = 6;
            break;
          default:
            return;
            break;
        }    
      }


      ticketsArea(): void {
        const areaKey = `numTicketsArea_${this.para_area}`; // Genera una clave única para el área
        const cachedNumTicketsArea = localStorage.getItem(areaKey);
        
        if (cachedNumTicketsArea !== null) {
            this.numTicketsArea = cachedNumTicketsArea;
            return; // Si hay datos en cache, no hacer la solicitud
        }

        this.ticketsService.getTicketForAreaId(this.para_area).subscribe((res) => {
            let numTA = res.length;
            this.numTicketsArea = numTA;
            if (res.length === undefined) {
                this.numTicketsArea = "0";
            }
            // Almacenar el resultado en localStorage
            localStorage.setItem(areaKey, this.numTicketsArea.toString());
        }, (error) => {
            // Maneja errores aquí si es necesario
            this.numTicketsArea = "Error al cargar tickets de área";
        });
    }

    //obtener un conteo de los ticketsEnviados por cada usuario 
    getTicketsCount(){
        
        this.ticketsService.getTableTicketsTotales(this.user.usuario).subscribe((res)=>{
            // console.log(res.message)
            if( res.message){
                this.ticketsEnviados = 0;
                return;
            }
            this.ticketsEnviados = res.conteo_tickets
        })
        this.getTicketsPendientes();
    }

    //obtener los tickets pendientes para cada area

    getTicketsPendientes(){
        this.ticketsService.getTableTicketsPendientes(this.para_area).subscribe((res)=>{
            if(res.message){
                this.ticketsPendientes = 0;
                return;
            }
            // this.ticketsPendientes = res.conteo_tickets;
            if (res.para_area) {
                this.ticketsPendientes = res.conteo_tickets;
            } else {
                this.ticketsPendientes = 0;
            }

            
        })    
        this.getTicketsTerminados()
}

getTicketsTerminados(){
    this.ticketsService.getTableTicketsTerminados(this.user.usuario).subscribe((res)=>{
        if(res.message){
            this.ticketsTerminados = 0
            // return;
        }else{

            this.ticketsTerminados = res.conteo_tickets;
        }
        this.ticketsTotales =  this.ticketsPendientes + this.ticketsEnviados + this.ticketsTerminados
        if(this.ticketsTotales ===undefined) this.ticketsTotales = 0  //solucionar esto
    })
    // console.log(this.ticketsTotales)
}



redirectToOficinas() {
    setTimeout(() => {
      window.location.href = "https://cgpowers.cgpgroup.mx";
    }, 100);
  }
}







