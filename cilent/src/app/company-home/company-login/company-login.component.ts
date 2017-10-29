import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './../../common/services/company.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

	company = {
		email: "",
		password: ""
	}
  constructor(private _company: CompanyService) { }

  ngOnInit() {
  }

  login(company){
  	console.log(company)
  	this._company.login(company)
  }

}
