import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth-guard.service';
import { ProcessoListComponent } from './componentes/processo/processo-list/processo-list.component';
import { ProcessoCreateComponent } from './componentes/processo/processo-create/processo-create.component';
import { ProcessoEditComponent } from './componentes/processo/processo-edit/processo-edit.component';
import { ProcessoViewComponent } from './componentes/processo/processo-view/processo-view.component';
import { HomeComponent } from './componentes/componentes-page/home/home.component';

const routes: Routes = [
  { path: 'processo-lista', component: ProcessoListComponent},
  { path: 'processo-create', component: ProcessoCreateComponent},
  { path: 'processo-edit/:id', component: ProcessoEditComponent},
  { path: 'processo-view/:id', component: ProcessoViewComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
