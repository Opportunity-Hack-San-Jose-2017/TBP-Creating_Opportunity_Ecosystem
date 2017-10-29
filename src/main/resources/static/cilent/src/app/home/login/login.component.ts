import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user = {
		email: "",
		password: ""
	}

  	constructor(private _user: UserService) { }

  	ngOnInit() {
  	}

  	login(){
  		this._user.login(this.user)
  	}
}
