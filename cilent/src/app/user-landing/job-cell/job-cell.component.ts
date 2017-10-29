import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-cell',
  templateUrl: './job-cell.component.html',
  styleUrls: ['./job-cell.component.css']
})
export class JobCellComponent implements OnInit {
  show = true;
  @Input() job: any;
  isAccessible: String = '';
  constructor() {
    this.isAccessible = this.job['publicTransport'] ? 'Yes' : 'No';
  }

  ngOnInit() {
  }

  toggle(){
  	this.show = !this.show
  }
}
