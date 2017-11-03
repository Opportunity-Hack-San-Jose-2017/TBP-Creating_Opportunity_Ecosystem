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
	morning: Boolean = false;
	noon: Boolean = false;
	night: Boolean = false;
	graveyard: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	availability: any = ['ft', 'pt', 'temp'];

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	createForm() {
		this.userForm = this.fb.group({
			city: [''],
			language: ['']
		});
	  }
	
	handleClick() {
		console.log(this.userForm.value)
		const obj = Object.assign({}, {
			shift: this.shifts.filter(x => this[x]),
			availability: this.availability.filter(x => this[x]),
			city: this.userForm.value["city"],
			language: this.userForm.value["language"]
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
