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
		firstName: "",
		lastName: "",
		introduction: "",
		experience: "",
		education: "",
		skillsSet: [],
		verified: "",
		hashValue: ""
	}

	constructor(private _user: UserService) { }

	ngOnInit() {
	
	}

	registration() {
		this._user.register(this.user);
	} 
}
