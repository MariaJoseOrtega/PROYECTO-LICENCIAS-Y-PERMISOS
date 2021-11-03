import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imgs = [...Array(18).keys()];

  constructor() {
  }

  ngOnInit(): void {
  }

}
