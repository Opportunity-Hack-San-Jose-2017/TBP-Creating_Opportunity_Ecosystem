import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	userForm: FormGroup;
	user = {
		email: "",
		token: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: ""
	}

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) { }

	registration() {
		const obj = {
			email: this.userForm.value.email,
			firstName: this.userForm.value.firstName,
			lastName: this.userForm.value.lastName,
			password: this.userForm.value.password,
			introduction: "",
			experience: "",
			skillsSet: [],
			verified: false,
			hashValue: ""
		}
		this._user.register(obj);
	} 

	createForm() {
	this.userForm = this.fb.group({
		firstName: ['', Validators.required ],		
		lastName: ['', Validators.required ],		
		caseFileID: ['', Validators.required ],		
		accept: ['', Validators.required ],		
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required ],
	});
}
}
