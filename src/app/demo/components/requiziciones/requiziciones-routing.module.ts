import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequizicionesComponent } from './requiziciones.component';

const routes: Routes = [{ path: '', component: RequizicionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequizicionesRoutingModule { }
