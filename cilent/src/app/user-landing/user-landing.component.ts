import { SearchService } from '../common/services/search.service';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import {
  AfterViewInit,
  animate,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  state,
  style,
  transition,
  trigger,
  ViewChild,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  styleUrls: ['./user-landing.component.css'],
  animations: [
    trigger('slideAnimation',
		[
			transition(':enter', [
				style({transform:'scaleY(0)'}),
				animate('190ms', style({transform:'scaleY(1)'}))
			]),
			transition(':leave', [
				style({transform:'scaleY(1)'}),
				animate('190ms', style({transform:'scaleY(0)'}))
			])
		]
	)]
})
export class UserLandingComponent {

  user: any;
  search: Boolean = false;
  jobs: any;

	toggleDropDown = false;
  constructor(
    private _search: SearchService,
    private _user: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('item')) || {};
    // commented out for testing ! //
    // _search.getAllJobs()
    //   .subscribe((v: any) => this.jobs = v);
    this.jobs = [job, job, job, job,job,job,job,job,job]
  }

  searchClick() {
    this.search = !this.search;
  }

  logout() {
    this._user.logout();
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

}
