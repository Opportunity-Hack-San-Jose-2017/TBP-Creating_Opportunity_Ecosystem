import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CompanyService } from './../common/services/company.service';
import { UserService } from './../common/services/user.service';

@Component({
  selector: 'app-employers-landingpage',
  templateUrl: './employers-landingpage.component.html',
  styleUrls: ['./employers-landingpage.component.css']
})
export class EmployersLandingpageComponent {
	toggleDropDown = false;
	company: any;
	constructor(
		private _router: Router,
		private _company: CompanyService,
		private _user: UserService
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

	logout() {
		localStorage.clear();
		this._company.logout();
	}

	getThisPerson(){
		this._user.getProfile("lormanlau@gmail.com")
	}
}
