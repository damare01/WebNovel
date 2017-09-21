import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdToolbarModule } from "@angular/material";
import { BookGridComponent } from './book-grid/book-grid.component';
import {AuthenticationService} from "./authentication.service";
import { wnHttpProvider} from "./wnhttp.service";

@NgModule({
  declarations: [
    AppComponent,
    BookGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    wnHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
