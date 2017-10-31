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
	first: Boolean = false;
	second: Boolean = false;
	third: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	createForm() {
		this.userForm = this.fb.group({
			city: [''],
			languages: ['']
		});
	  }
	
	handleClick() {

		const obj = Object.assign(this.userForm.value, {
			availability: Object.assign({}, {
				morning: this.first ? true : false,
				noon: this.second ? true : false,
				night: this.third ? true : false
			}),
			jobType: Object.assign({}, {
				fullTime: this.ft ? true : false,
				partTime: this.pt ? true : false,
				temporary: this.temp ? true : false
			})
		})
		console.log(obj);
		this._user.sendProfileInfo(obj);
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}
  
	back() {
		this._user.stepBack();
	}

}
