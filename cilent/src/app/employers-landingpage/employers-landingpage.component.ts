import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../common/services/company.service';

@Component({
  selector: 'app-employers-landingpage',
  templateUrl: './employers-landingpage.component.html',
  styleUrls: ['./employers-landingpage.component.css']
})
export class EmployersLandingpageComponent implements OnInit {

	toggleDropDown = false;
	company: any = { "name" : "redbull"}
	constructor(
		private _company: CompanyService
	) {
		this.company = localStorage.getItem("company")
	}

	ngOnInit() {
	}

	dropdowntoggle() {
		this.toggleDropDown = !this.toggleDropDown
	}

	logout() {
		this._company.logout()
		localStorage.clear()
	}
}
