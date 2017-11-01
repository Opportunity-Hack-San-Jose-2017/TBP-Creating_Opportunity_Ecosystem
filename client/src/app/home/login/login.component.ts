import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	userForm: FormGroup;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
		Observable.fromEvent(document, 'keyup')
			.filter((v: any) => v.keyCode === 13)
			.subscribe(() => this.login())
	}

	login() {
		this._user.login(this.userForm.value);
	}

	createForm() {
		this.userForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required ],
		});
	}
}
