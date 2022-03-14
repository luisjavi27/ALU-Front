import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CuentaComponent} from './cuenta/cuenta.component'
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';
const routes: Routes = [
 {path:'cuenta/:id', component:CuentaComponent },
 {path:'login', component:FormularioIngresoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
