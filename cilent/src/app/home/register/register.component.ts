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
		lastName: "",
		hashValue: ""
	}

	constructor(private _user: UserService) { }

	ngOnInit() {
	
	}

	registration(user: any) {
		this._user.register(user);
	} 
}
