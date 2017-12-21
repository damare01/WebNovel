import {AfterViewInit, Component, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Chapter} from '../../models/chapter'
import {User} from '../../models/user'
import {UserService} from '../user.service'
import {LikeService} from '../like.service'
import {AuthenticationService} from '../authentication.service'

import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/table'
import 'tinymce/plugins/link'
import {NotificationService} from '../notification.service'
import {ReadingHistoryService} from '../reading-history.service'
import {Edge} from '../../models/edge'

@Component({
  selector: 'wn-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit, AfterViewInit {

  chapterId: string
  chapter: Chapter
  author: User
  liked = false
  disliked = false

  newBody = ''

  numberOfLikes = 0
  numberOfDislikes = 0

  editable = false

  showGraph = false

  graphMode = 'read'
  newEdgesFromGraph: Edge[]
  newNodesFromGraph: any[]
  selectedNodeFromGraph: any

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService,
              private _likeService: LikeService,
              private _authService: AuthenticationService,
              private _notificationService: NotificationService,
              private _readingHistoryService: ReadingHistoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chapterId = params['chapterId']
      this.getChapterAndAuthor(this.chapterId)
      this.getNumberOfLikes(this.chapterId)
      this.getMyLike(this.chapterId)
      this.addOneView()
    })
  }

  ngAfterViewInit() {
  }

  addOneView() {
    this._chapterService.increaseViewsByOne(this.chapterId).subscribe()
  }

  initInlineEditor() {
    tinymce.init({
      selector: 'div#chapter-content',
      inline: true,

      skin_url: '../assets/skins/lightgray',
      toolbar: 'insertfile undo redo | styleselect | bold italic ' +
      '| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      menubar: false,
      setup: editor => {
        editor.on('keyup change', () => {
          const content = editor.getContent()
          this.newBody = content
        })
      }
    })
  }

  removeInlineEditor() {
    if (tinymce) {
      tinymce.remove()
    }
  }

  editChapter() {
    this.editable = true
    this.initInlineEditor()
  }

  saveChapter() {
    this.editable = false
    this.removeInlineEditor()
    if (this.newBody) {
      this.chapter.body = this.newBody
    }
    this._chapterService.updateChapter(this.chapter).subscribe(newChapter => {
    })
  }

  discardChanges() {
    this.editable = false
    this.removeInlineEditor()
    const currentChapter = this.chapter
    this.chapter = null
    setTimeout(() => {
      this.chapter = currentChapter
    })
  }

  loggedInUserIsAuthor(): boolean {
    return this._userService.getCurrentUserId() === this.chapter.author
  }

  getNumberOfLikes(chapterId: string) {
    this._likeService.getNumberOfChapterLikes(chapterId).subscribe(likeCount => {
      this.numberOfLikes = likeCount.likes
    }, err => {
      // ignore
    })

    this._likeService.getNumberOfChapterDislikes(chapterId).subscribe(dislikeCount => {
      this.numberOfDislikes = dislikeCount.dislikes
    }, err => {
      // ignore
    })
  }

  getMyLike(chapterId) {
    this.liked = this.disliked = false
    this._likeService.getMyChapterLike(chapterId).subscribe(like => {
      if (like.vote === 1) {
        this.liked = true
        this.disliked = false
      } else {
        this.disliked = true
        this.liked = false
      }
    }, err => {
      // ignore
    })
  }

  getChapterAndAuthor(chapterId: string) {
    this._chapterService.getChapter(this.chapterId).subscribe(chapter => {
      this.chapter = chapter
      this.getUser(this.chapter.author)
    })
  }

  getUser(userId: string) {
    this._userService.getUser(userId).subscribe(user => {
        this.author = user
      },
      err => {
        this.author = new User()
        this.author.penName = 'Unknown'
      })
  }

  writeChapter(parentChapter: string) {
    this.router.navigate(['/write', parentChapter])
  }

  like() {
    this.disliked = false
    this.liked = true
    this._likeService.likeChapter(this.chapterId).subscribe(res => {
      this.getNumberOfLikes(this.chapterId)
      this._notificationService.postLikeNotification(this.chapterId, true)
    }, err => {
      this.liked = false
      console.log(err)
    })
  }

  dislike() {
    this.liked = false
    this.disliked = true
    this._likeService.dislikeChapter(this.chapterId).subscribe(res => {
      this.getNumberOfLikes(this.chapterId)
      this._notificationService.postLikeNotification(this.chapterId, false)
    }, err => {
      this.disliked = false
    })
  }

  toggleGraph() {
    if(this.showGraph){
      this.graphMode = 'read'
      this.newNodesFromGraph = undefined
      this.newEdgesFromGraph = undefined
      this.selectedNodeFromGraph = undefined
    }
    this.showGraph = !this.showGraph

  }

  isLoggedIn(): boolean {
    return this._authService.isLoggedIn()
  }

  openEditGraph() {
    this.graphMode = 'draw'
    this.showGraph = true
  }

  setGraphMode(mode: string) {
    this.graphMode = mode
  }

  setNewEdgesFromGraph(edges: Edge[]){
    this.newEdgesFromGraph = edges
  }

  setNewNodesFromGraph(nodes: any[]){
    this.newNodesFromGraph = nodes
  }

  setSelectedNodeFromGraph(node: any) {
    this.selectedNodeFromGraph = node
  }
}
