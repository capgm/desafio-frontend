import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptor } from '../../TokenInterceptor';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideHttpClient(),
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ]
})
export class ComponentesPageModule { }
