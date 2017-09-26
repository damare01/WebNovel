import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MdButtonModule, MdFormFieldModule, MdInputModule, MdSnackBarModule, MdToolbarModule} from "@angular/material";
import { BookGridComponent } from './book-grid/book-grid.component';
import {AuthenticationService} from "./authentication.service";
import { wnHttpProvider} from "./wnhttp.service";
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {ChapterService} from "./chapter.service";
import {BookService} from "./book.service";
import { NavigationGraphComponent } from './navigation-graph/navigation-graph.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'graph', component: NavigationGraphComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/login'}
];


@NgModule({
  declarations: [
    AppComponent,
    BookGridComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavigationGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MdButtonModule,
    MdFormFieldModule,
    MdInputModule,
    FormsModule,
    MdSnackBarModule
  ],
  providers: [
    AuthenticationService,
    wnHttpProvider,
    ChapterService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
