import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wn-new-draft-dialog',
  templateUrl: './new-draft-dialog.component.html',
  styleUrls: ['./new-draft-dialog.component.css']
})
export class NewDraftDialogComponent implements OnInit {

  @Output() close = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
  }

  emitClose(){
    this.close.emit()
  }
}


