import { UserService } from '../../common/services/user.service';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './../../common/services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent {

	companyForm: FormGroup;
	
		constructor(
			private _company: CompanyService,
			private fb: FormBuilder
		) {
			this.createForm();
		}
	
		login() {
			this._company.login(this.companyForm.value);
		}
	
		createForm() {
			this.companyForm = this.fb.group({
				email: ['', [Validators.required, Validators.email]],
				password: ['', Validators.required ],
			});
		}

}
