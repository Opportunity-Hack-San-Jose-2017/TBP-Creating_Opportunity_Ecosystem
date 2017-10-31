import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selector } from 'rxjs/operator/publish';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';
const company = {
	website: "", address: "",
	description: "", verified: true,
	hashValue: ""
}

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent {

	companyForm: FormGroup;
	@ViewChild('accept', {read: ElementRef}) accept: ElementRef;

	constructor(
		private _company: CompanyService,
		private fb: FormBuilder
	) {
		this.createForm();
		
	}
	
	registration() {
		if (this.accept.nativeElement.value) {
			console.log(this.accept.nativeElement.value)
			const obj = {
				email: this.companyForm.value.email,
				name: this.companyForm.value.name,
				password: this.companyForm.value.password,
				token: this.companyForm.value.token
			}
			const newObj = Object.assign(obj, company);
			this._company.register(obj);
		}
	} 

	createForm() {
		this.companyForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required ],		
			name: ['', Validators.required ],
			token: ['', Validators.required ],
			confirmPassword: ['', Validators.required ],
			accept: [''],
		});
	}
	
}
