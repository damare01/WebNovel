import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';

@Component({
  selector: 'wn-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnDestroy, AfterViewInit {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor: any;

  constructor() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: 400,
      skin_url: '../assets/skins/lightgray',
      menubar: false,
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      browser_spellcheck: true,
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
