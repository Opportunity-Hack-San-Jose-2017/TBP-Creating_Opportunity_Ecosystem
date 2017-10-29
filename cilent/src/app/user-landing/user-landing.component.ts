import { Component, OnInit } from '@angular/core';
import { SearchService } from './../common/services/search.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

  jobs: any;
	toggleDropDown = false;
  constructor(private search: SearchService) { }

  ngOnInit() {
    this.search.getAllJobs()
    .subscribe(data => this.jobs = data)
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

}
