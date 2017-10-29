import { Component, OnInit } from '@angular/core';
import { SearchService } from '../common/services/search.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent {

  user: any;
  jobs: any;

	toggleDropDown = false;
  constructor(private _search: SearchService) {
    this.user = JSON.parse(localStorage.getItem('item')) || {};
    _search.getAllJobs()
      .subscribe((v: any) => this.jobs = v);
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

}
