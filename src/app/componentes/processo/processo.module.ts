import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessoListComponent } from './processo-list/processo-list.component';
import { ProcessoEditComponent } from './processo-edit/processo-edit.component';
import { ProcessoCreateComponent } from './processo-create/processo-create.component';
import { ProcessoViewComponent } from './processo-view/processo-view.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PipeModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    ProcessoListComponent,
    ProcessoEditComponent,
    ProcessoCreateComponent,
    ProcessoViewComponent
  ],
  providers: [
    provideHttpClient()
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    PipeModule
  ],
  exports:[
    ProcessoListComponent,
    ProcessoEditComponent,
    ProcessoCreateComponent,
    ProcessoViewComponent
  ]
})
export class ProcessoModule { }
