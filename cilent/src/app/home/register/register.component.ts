import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	user = {
		email: "",
		token: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: ""
	}

	constructor(private _user: UserService) { }

	registration(user: any) {
		const obj = {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			password: user.password,
			introduction: "",
			experience: "",
			skillsSet: [],
			verified: false,
			hashValue: ""
		}
		this._user.register(obj);
	} 
}
