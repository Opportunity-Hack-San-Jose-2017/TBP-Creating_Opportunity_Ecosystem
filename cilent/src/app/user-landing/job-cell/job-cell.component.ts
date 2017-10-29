import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-cell',
  templateUrl: './job-cell.component.html',
  styleUrls: ['./job-cell.component.css']
})
export class JobCellComponent implements OnInit {
	show = true;

  constructor() { }

  ngOnInit() {
  }

  toggle(){
  	this.show = !this.show
  }
}
