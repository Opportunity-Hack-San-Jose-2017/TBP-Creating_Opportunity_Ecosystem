import { Router } from '@angular/router';
import { CompanyService } from './../common/services/company.service';
import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-employers-landingpage',
  templateUrl: './employers-landingpage.component.html',
  styleUrls: ['./employers-landingpage.component.css'],
  animations: [
	  trigger('slideAnimation',
	  [
			transition(':enter', [
				style({ transform: 'translateX(-250px)' }),
				animate('200ms', style({ transform: 'translateX(0)' }))
			]),
			transition(':leave', [
				style({ transform: 'translateX(0)' }),
				animate('125ms', style({ transform: 'translateX(-250px)' }))
			])
		]
	)
]
})

export class EmployersLandingpageComponent {

	toggleDropDown: boolean = false;
	navState: boolean = false;
	company: any;

	constructor(
		private _router: Router,
		private _company: CompanyService
	) {
		this.company = JSON.parse(localStorage.getItem("company")) || {};
		this.getAllOpenings()
		console.log(this.company)
	}

	getAllOpenings(){
		this._company.getAllOpenings()
		.subscribe((data: any) => console.log(data))
	}

	dropdowntoggle() {
		this.toggleDropDown = !this.toggleDropDown;
	}

	newJob() {
		this._router.navigate(['company/opening/create']);
	}

	nav() {
		this.navState = !this.navState;
	}

	logout() {
		localStorage.clear();
		this._company.logout();
	}
}
