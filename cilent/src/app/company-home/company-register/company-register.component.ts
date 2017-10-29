import { Component, OnInit } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

	company = {
		email: "",
		password: "",
		name: "",
		website: "",
		address: "",
		description: "",
		verified: true,
		hashValue: "",
		token: ""
	}

  constructor(private _company: CompanyService) { }

  ngOnInit() {
  }

  register(company){
  	this._company.register(company)
  }

  logout(){
  	this._company.logout()
  	.subscribe(data => console.log(data))
  }
}
