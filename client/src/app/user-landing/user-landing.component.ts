import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],

})
export class UserLandingComponent {

	user: any;

	constructor(
		private _router: Router,
		private _user: UserService
	) {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	goToEditProfile(){
		this._router.navigate(["profile/edit"])
	}

	logout() {
		this._user.logout();
	}

}
