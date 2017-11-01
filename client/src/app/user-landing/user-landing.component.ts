import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import {
	animate,
	Component,
	state,
	style,
	transition,
	trigger
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-user-landing',
	templateUrl: './user-landing.component.html',
	styleUrls: ['./user-landing.component.css'],
	animations: [
		trigger('slideAnimation',
			[
				transition(':enter', [
					style({ transform: 'translateX(-250px)' }),
					animate('200ms', style({ transform: 'translateX(0)' }))
				]),
				transition(':leave', [
					style({ transform: 'translateX(0)' }),
					animate('125ms', style({ transform: 'translateX(-250px)' }))
				])
			]
		)
	]
})
export class UserLandingComponent {

	user: any;
	navState: Boolean = false;

	constructor(
		private _router: Router,
		private _user: UserService
	) {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	ngAfterViewInit() {
		console.log(this.navState)
	}
	goToEditProfile(){
		this._router.navigate(["profile/edit"])
	}

	logout() {
		this._user.logout();
	}

	nav() {
		this.navState = !this.navState;
	}

}
