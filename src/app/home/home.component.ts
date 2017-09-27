import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'wn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  showError() {
    this.snackBar.open("This doesn't work yet", ":(", {
      duration: 2000
    });
  }
}
