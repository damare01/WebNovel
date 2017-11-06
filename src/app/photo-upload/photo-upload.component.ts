import {Component, OnInit} from '@angular/core'
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload'

@Component({
  selector: 'wn-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  uploader: FileUploader
  hasBaseDropZoneOver = false

  constructor() {
  }

  ngOnInit() {
    const uploadOptions: FileUploaderOptions = {
      url: 'https://api.imgur.com/3/image',
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      authToken: 'Client-ID 274bd095b56eb73'
    }
    this.uploader = new FileUploader(uploadOptions)
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e
  }

}
