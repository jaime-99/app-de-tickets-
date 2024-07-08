import { NgModule } from '@angular/core';
import { HistorialRentaComponent } from './historial-renta/historial-renta.component';
import { RentaComponent } from './renta/renta.component';
import { RentaRoutingModule } from './rentaLaptop-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        //modulo de routing
        RentaRoutingModule,
        CommonModule
    ],
    exports: [],
    providers: [],
})
export class rentaLaptopModule { }
