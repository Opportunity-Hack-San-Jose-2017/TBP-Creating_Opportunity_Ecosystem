import { UserService } from '../common/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent {

	step: Number;
	user = {telephone: ''};
	name = 'John Doe';

	constructor(private _user: UserService) {
		this._user.getSetupStep()
			.do(v => console.log(v))
			.subscribe((v: Number) => this.step = v);
	}

	ngOnInit() {
		localStorage.getItem('setupStep') == undefined ? localStorage.setItem('setupStep', '1') : null;		
		this.step = Number(localStorage.getItem('setupStep'));
	}

	handleClick() {
		this.step = Number(localStorage.getItem('setupStep'));
	}

}
