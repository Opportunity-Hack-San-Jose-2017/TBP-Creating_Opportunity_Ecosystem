import { Component, OnInit } from '@angular/core';
import { SearchService } from '../common/services/search.service';
const job = {
  location: "San Francisco",
  company: 'Paypal',
  shift: 'First',
  jobType: 'Full Time',
  description: 'this is a full time software engineering role pelase join the team',
  publicTransport: true
}
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
    // _search.getAllJobs()
    //   .subscribe((v: any) => this.jobs = v);
    this.jobs = [job, job, job, job,job,job,job,job,job]
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

}
