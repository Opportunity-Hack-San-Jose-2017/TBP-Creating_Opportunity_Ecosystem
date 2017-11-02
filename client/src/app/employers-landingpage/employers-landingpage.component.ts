import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CompanyService } from './../common/services/company.service';

@Component({
  selector: 'app-employers-landingpage',
  templateUrl: './employers-landingpage.component.html',
  styleUrls: ['./employers-landingpage.component.css']
})
export class EmployersLandingpageComponent {

	toggleDropDown = false;
	company: any = { "name" : "redbull"}
	constructor(
		private _router: Router,
		private _company: CompanyService
	) {
		this.company = localStorage.getItem("company") || {};
	}

	dropdowntoggle() {
		this.toggleDropDown = !this.toggleDropDown;
	}

	newJob() {
		this._router.navigate(['company/opening/create']);
	}

	logout() {
		localStorage.clear();
		this._company.logout();
	}
}
