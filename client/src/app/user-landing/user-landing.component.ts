import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import {
	animate,
	Component,
	state,
	style,
	transition,
	trigger,
	ContentChild
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { JobsComponent } from './jobs/jobs.component';

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
	],
	providers: [JobsComponent]
})
export class UserLandingComponent {
	@ContentChild(JobsComponent) jobs: JobsComponent;

	user: any;
	navState: Boolean = false;

	constructor(
		private _router: Router,
		private _user: UserService,
	) {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	edit(){
		this._router.navigate(["profile/edit"])
	}

	logout() {
		this._user.logout();
	}

	nav() {
		this.navState = !this.navState;
	}

	getAppliedJobs(){
		// this.jobs.getAppliedJobs()
	}
}
