import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../common/services/company.service';

@Component({
  selector: 'app-employers-landingpage',
  templateUrl: './employers-landingpage.component.html',
  styleUrls: ['./employers-landingpage.component.css']
})
export class EmployersLandingpageComponent implements OnInit {

	company:any = {}
	constructor(
		private _company: CompanyService
	) {
		this.company = localStorage.getItem("company")
	}

	ngOnInit() {
	}

	logout() {
		this._company.logout()
		localStorage.clear()
	}
}
