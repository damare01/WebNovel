import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'wn-info-text',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.css']
})
export class InfoTextComponent implements OnInit {

  @Input() text = ''

  constructor() {
  }

  ngOnInit() {
  }

}
