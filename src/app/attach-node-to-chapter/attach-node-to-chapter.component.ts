import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Edge} from '../../models/edge'
import {ChapterService} from '../chapter.service'
import {Chapter} from '../../models/chapter'
import {NodeMap} from '../../models/nodemap'
import {EdgeService} from '../edge.service'
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'wn-attach-node-to-chapter',
  templateUrl: './attach-node-to-chapter.component.html',
  styleUrls: ['./attach-node-to-chapter.component.css']
})
export class AttachNodeToChapterComponent implements OnInit, OnChanges {

  @Input() selectedNode: any
  @Input() newNodes: any[]
  @Input() newEdges: Edge[]

  chapters: Chapter[]
  selectedChapter: Chapter

  connections: Connection[] = []

  @Output() currentNodeMap = new EventEmitter<NodeMap[]>()

  allNodesHasChapter = false

  constructor(private _chapterService: ChapterService,
              private _edgeService: EdgeService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._chapterService.getMyUnusedChapters().subscribe(chapters => {
      this.chapters = chapters
      console.log(this.chapters)
    })
  }

  ngOnChanges() {
    const existingConnection = this.connections.find(conn => conn.nodeId == this.selectedNode._id);
    if(existingConnection){
      this.selectedChapter = existingConnection.chapter
    } else {
      this.selectedChapter = null
    }
  }

  selectChapter(chapter: Chapter) {
    this.selectedChapter = chapter

    let connection = this.connections.find(connection => connection.nodeId === this.selectedNode._id)
    if (connection) {
      connection.chapter = this.selectedChapter
      this.connections = this.connections
    } else {
      this.connections = this.connections.concat({nodeId: this.selectedNode._id, chapter: this.selectedChapter})
    }

    let currenNodeMapping = this.connections.map(conn => {
      const nodeMap = new NodeMap()
      nodeMap.title = conn.chapter.title
      nodeMap.nodeId = conn.nodeId
      return nodeMap
    })

    this.currentNodeMap.emit(currenNodeMapping)

    this.allNodesHasChapter = this.connections.length === this.newNodes.length
  }

  save() {

    const edgesToSave: Edge[] = []

    this.newEdges.forEach(edge => {
      const updatedEdge = new Edge()
      updatedEdge.bookId = edge.bookId

      const source = this.connections.find(conn => conn.nodeId == edge.source)
      if (source) {
        updatedEdge.source = source.chapter._id
      } else {
        updatedEdge.source = edge.source
      }

      const target = this.connections.find(conn => conn.nodeId == edge.target)
      if (target) {
        updatedEdge.target = target.chapter._id
      } else {
        updatedEdge.target = edge.target
      }

      edgesToSave.push(updatedEdge)
    })


    let chapterCounter = 0
    let edgeCounter = 0
    this.connections.forEach(conn => {
      const updateChapter = conn.chapter
      updateChapter.book = this.newEdges[0].bookId
      updateChapter.published = true
      this._chapterService.updateChapter(updateChapter).subscribe(() =>{
        if(++chapterCounter === this.connections.length){
          edgesToSave.forEach(edge =>{
            this._edgeService.createEdge(edge).subscribe(() =>{
              if(++edgeCounter === edgesToSave.length){
                this.snackBar.open('New path sucessfully saved', "OK", {
                  duration: 2000
                })
              }
            }, err =>{
              this.snackBar.open('Something went wrong when saving', "OK", {duration: 2000})
            })
          })
        }
      } ,err =>{
        this.snackBar.open('Something went wrong when saving', "OK", {duration: 2000})
      })
    })


  }
}

class Connection {
  nodeId: string
  chapter: Chapter
}
