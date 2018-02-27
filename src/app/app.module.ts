import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'

import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule,
  MatSnackBarModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material'
import {BookGridComponent} from './book-grid/book-grid.component'
import {AuthenticationService} from './authentication.service'
import {wnHttpProvider} from './wnhttp.service'
import {RouterModule, Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import {FormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
import {RegisterComponent} from './register/register.component'
import {ChapterService} from './chapter.service'
import {BookService} from './book.service'
import {NavigationGraphComponent} from './navigation-graph/navigation-graph.component'
import {BrowseComponent} from './browse/browse.component'
import {ReadComponent} from './read/read.component'
import {NotFoundComponent} from './notfound/notfound.component'
import {WriteComponent} from './write/write.component'
import {UserService} from './user.service'
import {NewBookComponent} from './new-book/new-book.component'
import {CurrentlyReadingComponent} from './currently-reading/currently-reading.component'
import {SectionHeaderComponent} from './section-header/section-header.component'
import {RecommendedComponent} from './recommended/recommended.component'
import {UserMenuComponent} from './user-menu/user-menu.component'
import {EditorComponent} from './editor/editor.component'
import {MyBooksComponent} from './my-books/my-books.component'
import {MyBooksPageComponent} from './my-books-page/my-books-page.component'
import {InfoTextComponent} from './info-text/info-text.component'
import {MyChaptersComponent} from './my-chapters/my-chapters.component'
import {MyChaptersPageComponent} from './my-chapters-page/my-chapters-page.component'
import {ReCaptchaModule} from 'angular2-recaptcha'
import {AuthGuard} from './auth.guard'
import {LikeService} from './like.service'
import {CapitalizePipe} from './capitalize.pipe'
import {TagInputModule} from 'ngx-chips'
import {MyDraftsComponent} from './my-drafts/my-drafts.component'
import {ChapterGridComponent} from './chapter-grid/chapter-grid.component'
import {EditDraftComponent} from './edit-draft/edit-draft.component'
import {FlexLayoutModule} from '@angular/flex-layout'
import {Angulartics2, Angulartics2GoogleAnalytics, Angulartics2Module} from 'angulartics2'
import {CommentComponent} from './comment/comment.component'
import {CommentEditorComponent} from './comment-editor/comment-editor.component'
import {CommentService} from './comment.service'
import {DiscussionComponent} from './discussion/discussion.component'
import {ChapterDiscussionComponent} from './chapter-discussion/chapter-discussion.component'
import {NotificationCardComponent} from './notification-card/notification-card.component'
import {NotificationListComponent} from './notification-list/notification-list.component'
import {NotificationPopupButtonComponent} from './notification-popup-button/notification-popup-button.component'
import {NotificationService} from './notification.service'
import {ProfilePageComponent} from './profile-page/profile-page.component'
import {PhotoUploadComponent} from './photo-upload/photo-upload.component'
import {FileUploadModule} from 'ng2-file-upload'
import {AuthorCardComponent} from './author-card/author-card.component'
import {SelectNextChapterComponent} from './select-next-chapter/select-next-chapter.component'
import {ColorService} from './color.service'
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import {SocketService} from './socket.service'
import { UserBadgesComponent } from './user-badges/user-badges.component'
import {BadgeService} from './badge.service';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { BookGraphComponent } from './book-graph/book-graph.component'
import {EdgeService} from './edge.service';
import { BookTreeGraphComponent } from './book-tree-graph/book-tree-graph.component';
import { BookCardComponent } from './book-card/book-card.component'
import {ReadingHistoryService} from './reading-history.service';
import { AttachNodeToChapterComponent } from './attach-node-to-chapter/attach-node-to-chapter.component';
import { TitleFilterPipe } from './title-filter.pipe';
import { ChildrenCarouselComponent } from './children-carousel/children-carousel.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component'


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forcegraph', component: BookGraphComponent},
  {path: 'treegraph', component: BookTreeGraphComponent},
  {path: 'browse', component: BrowseComponent, canActivate: [AuthGuard]},
  {path: 'read/:chapterId', component: ReadComponent},
  {path: 'write/:parentChapter', component: WriteComponent, canActivate: [AuthGuard]},
  {path: 'write', component: WriteComponent, canActivate: [AuthGuard]},
  {path: 'edit/:chapterId', component: EditDraftComponent, canActivate: [AuthGuard]},
  {path: 'user/:userId', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'newbook', component: NewBookComponent, canActivate: [AuthGuard]},
  {path: 'mybooks', component: MyBooksPageComponent, canActivate: [AuthGuard]},
  {path: 'mychapters', component: MyChaptersPageComponent, canActivate: [AuthGuard]},
  {path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard]},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: NotFoundComponent}
]


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
    WriteComponent,
    NewBookComponent,
    CurrentlyReadingComponent,
    SectionHeaderComponent,
    RecommendedComponent,
    UserMenuComponent,
    EditorComponent,
    MyBooksComponent,
    MyBooksPageComponent,
    InfoTextComponent,
    MyChaptersComponent,
    MyChaptersPageComponent,
    CapitalizePipe,
    MyDraftsComponent,
    ChapterGridComponent,
    EditDraftComponent,
    CommentComponent,
    CommentEditorComponent,
    DiscussionComponent,
    ChapterDiscussionComponent,
    NotificationCardComponent,
    NotificationListComponent,
    NotificationPopupButtonComponent,
    ProfilePageComponent,
    PhotoUploadComponent,
    AuthorCardComponent,
    SelectNextChapterComponent,
    AccountSettingsComponent,
    UserBadgesComponent,
    UserStatisticsComponent,
    BookGraphComponent,
    BookTreeGraphComponent,
    BookCardComponent,
    AttachNodeToChapterComponent,
    TitleFilterPipe,
    ChildrenCarouselComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ReCaptchaModule,
    TagInputModule,
    MatTabsModule,
    FlexLayoutModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    FileUploadModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatListModule,
    MatSlideToggleModule
  ],
  providers: [
    AuthenticationService,
    wnHttpProvider,
    ChapterService,
    BookService,
    UserService,
    AuthGuard,
    LikeService,
    CommentService,
    NotificationService,
    ColorService,
    SocketService,
    BadgeService,
    EdgeService,
    ReadingHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
