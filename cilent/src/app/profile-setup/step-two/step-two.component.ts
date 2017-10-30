import { UserService } from '../../common/services/user.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent {

	userForm: FormGroup;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	createForm() {
		this.userForm = this.fb.group({
			city: [''],
			languages: [''],
			availability: this.fb.group({
				morning: [''],
				noon: [''],
				night: [''],
				graveyard: ['']
			}),
			jobType: this.fb.group({
				fullTime: [''],
				partTime: [''],
				temp: ['']
			})
		});
	  }
	
	handleClick() {
		this._user.sendProfileInfo(this.userForm.value);
  }
  
  back() {
		this._user.stepBack();
	}

}
