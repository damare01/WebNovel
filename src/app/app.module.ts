import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MdButtonModule, MdCardModule, MdFormFieldModule, MdIconModule, MdInputModule, MdSnackBarModule,
  MdToolbarModule
} from "@angular/material";
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
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
import { BrowseComponent } from './browse/browse.component';
import { ReadComponent } from './read/read.component';
import {NotFoundComponent} from "./notfound/notfound.component";
import { WriteComponent } from './write/write.component';
import {UserService} from "./user.service";


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'graph', component: NavigationGraphComponent},
  { path: 'browse', component: BrowseComponent},
  { path: 'read/:chapterId', component: ReadComponent},
  { path: 'write/:parentChapter', component: WriteComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    BookGridComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavigationGraphComponent,
    BrowseComponent,
    ReadComponent,
    NotFoundComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MdButtonModule,
    MdFormFieldModule,
    MdInputModule,
    FormsModule,
    MdSnackBarModule,
    MdCardModule,
    MdIconModule
  ],
  providers: [
    AuthenticationService,
    wnHttpProvider,
    ChapterService,
    BookService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
