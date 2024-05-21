import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpuFormatPipe } from './npu-format.pipe';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [
    NpuFormatPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NpuFormatPipe,
    DateFormatPipe
  ]
})
export class PipeModule { }
