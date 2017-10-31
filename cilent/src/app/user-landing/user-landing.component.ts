import { Component, OnInit } from '@angular/core';
import { SearchService } from '../common/services/search.service';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
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
  constructor(
    private _router: Router,
    private _search: SearchService,
    private _user: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    // commented out for testing ! //
    // _search.getAllJobs()
    //   .subscribe((v: any) => this.jobs = v);
    this.jobs = [job, job, job, job,job,job,job,job,job]
  }

  ngOnInit() {
  }

  logout() {
    this._user.logout();
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

  goToEditProfile(){
    this._router.navigate(["profile/edit"])
  }

}
