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
			skills: [''],
			experiences: [' ']
		});
	}
	
	handleClick() {
		this._user.sendProfileInfo(this.userForm.value);
  }
  
  back() {
		this._user.stepBack();
	}

}
