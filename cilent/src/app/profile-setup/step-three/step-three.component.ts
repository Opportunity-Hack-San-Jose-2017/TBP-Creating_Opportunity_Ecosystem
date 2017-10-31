import { UserService } from '../../common/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent {

	userForm: FormGroup;
	@Input() name: any;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	createForm() {
		this.userForm = this.fb.group({
			skillsSet: [''],
			experiences: ['']
		});
	}
	
	handleClick() {
		const user: any = JSON.parse(localStorage.getItem('user'));
		const obj = {
			skillsSet: [this.userForm.value.skillsSet], 
			experience: this.userForm.value.experience,
			email: user.email,
			token: user.token,
			firstName: user.firstName,
			lastName: user.lastName,
			education: user.education,
			verified: user.verified,
			hashValue: user.hashValue,
			pendingApplications: user.pendingApplications
		}
		this._user.sendProfileInfo(obj);
	}
  
  back() {
		this._user.stepBack();
	}

}
