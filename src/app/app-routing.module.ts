import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { generalGuard, generalGuard2 } from './demo/general.guard';
import { rentaGuard } from './demo/guards/renta.guard';
import { SinAcceso } from './demo/components/sinAccesso/sinAcceso.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', redirectTo: 'auth/login', pathMatch: 'full'
            },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [generalGuard],
                     },
                    { path: 'tickets', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule),
                        canActivate: [generalGuard]
                     },
                    { path: 'renta', loadChildren: () => import('./demo/components/rentaLaptops/rentaLaptop.module').then(m => m.rentaLaptopModule),
                        canActivate:[generalGuard,rentaGuard ]
                     },
                    { path: 'requisicion', loadChildren: () => import('./demo/components/requiziciones/requiziciones.module').then(m => m.RequizicionesModule),
                     },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'notifications', loadChildren: () => import('./demo/components/notifications/notifications.module').then(m => m.NotificationsModule),
                        canActivate: [generalGuard]
                     },
                    { path: 'editarPerfil', loadChildren: () => import('./demo/components/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilModule),
                        canActivate:[generalGuard]
                     }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule),
                canActivate:[generalGuard2]
             },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'sinAcceso', component: SinAcceso },
            { path: 'registrarse', loadChildren: () => import('./demo/components/auth/registrarse/registrarse.module').then(m => m.RegistrarseModule) },
            { path: 'requiziciones', loadChildren: () => import('./demo/components/requiziciones/requiziciones.module').then(m => m.RequizicionesModule) },
            // { path: 'notifications', loadChildren: () => import('./demo/components/notifications/notifications.module').then(m => m.NotificationsModule) },
            // { path: 'editarPerfil', loadChildren: () => import('./demo/components/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
