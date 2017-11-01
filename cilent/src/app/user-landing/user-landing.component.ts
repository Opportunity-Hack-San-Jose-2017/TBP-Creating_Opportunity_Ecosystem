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
import { FormBuilder, FormGroup } from '@angular/forms';

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
	searchForm: FormGroup;

	toggleDropDown = false;
	constructor(
		private _router: Router,
		private _search: SearchService,
		private _user: UserService,
		private fb: FormBuilder
		
	) {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.createForm();
		_search.getAllJobs()
			.subscribe((v: any) => this.jobs = v.openings);
	}

	createForm() {
		this.searchForm = this.fb.group({
			search: ['']
		});
	}
	searchClick() {
		this.search = !this.search;
	}

	handleSearch(e: Event) {
		this._search.filterJobs(this.searchForm.value)
			.do(v => console.log(v))
			.subscribe((v: any) => this.jobs = v.openings);
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
