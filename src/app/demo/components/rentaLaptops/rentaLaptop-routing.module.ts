import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
       
        { path: 'rentaLaptops', data: { breadcrumb: 'rentarLaptop' }, loadChildren: () => import('./renta/renta.module').then(m => m.rentaModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class RentaRoutingModule { }
