import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	user = {email: "", password: ""};
	error;

	constructor(private _user: UserService) { }

	login(user: any) {
		this._user.login(user);
	}
}
