import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistorialRentaComponent } from '../historial-renta/historial-renta.component';
import { RentaComponent } from './renta.component';
import { RentaDetalleComponent } from './renta-detalle/renta-detalle.component';
import { RentaAsignadaComponent } from './renta-asignada/renta-asignada.component';
import { RentaAsignadaDetalleComponent } from './renta-asignada-detalle/renta-asignada-detalle.component';
import { rentaGuard, rentaGuard2 } from 'src/app/demo/guards/renta.guard';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RentaComponent },
		{ path: 'miHistorial', component: HistorialRentaComponent },
		{ path: 'Asignadas', component: RentaAsignadaComponent, 
			canActivate:[rentaGuard2]
		 }  ,
		{ path: 'Asignadas/:id', component: RentaAsignadaDetalleComponent }, //? ver si esta bien
		{ path: ':id', component: RentaDetalleComponent },

    ])],
	exports: [RouterModule]

})
export class rentaLaptopRoutingModule { }

