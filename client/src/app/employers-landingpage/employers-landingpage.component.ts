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
		private _company: CompanyService
	) {
		this.company = localStorage.getItem("company") || {};
	}

	dropdowntoggle() {
		this.toggleDropDown = !this.toggleDropDown;
	}

	logout() {
		localStorage.clear();
		this._company.logout()
	}
}
