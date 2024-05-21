import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesPageModule } from './componentes-page/componentes-page';
import { ProcessoModule } from './processo/processo.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentesPageModule,
    ProcessoModule
  ],
  exports: [
    ComponentesPageModule,
    ProcessoModule
  ]
})
export class ComponentesModule { }
