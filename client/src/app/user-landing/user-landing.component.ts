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
    private _router: Router,
    private _search: SearchService,
    private _user: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    // commented out for testing ! //
    _search.getAllJobs()
      .subscribe((v: any) => this.jobs = v.openings);
  }

  searchClick() {
    this.search = !this.search;
  }

  handleSearch(e: Event) {
    this._search.getJobBySkill(e.target['value']);;
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
