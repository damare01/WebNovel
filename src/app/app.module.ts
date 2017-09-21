import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdToolbarModule } from "@angular/material";
import { BookGridComponent } from './book-grid/book-grid.component';
import {AuthenticationService} from "./authentication.service";
import { wnHttpProvider} from "./wnhttp.service";
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    BookGridComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationService,
    wnHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
