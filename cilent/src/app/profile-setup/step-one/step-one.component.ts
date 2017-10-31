import { UserService } from '../../common/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
	
	img: String;	
	userForm: FormGroup;
	@Input() name: any;

	constructor(
		private _user: UserService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	ngOnInit() {
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}

	createForm() {
		this.userForm = this.fb.group({
			phone: [''],
			about: [' ']
		});
	}

	handleClick() {
		console.log(this.userForm.value)
		this._user.sendProfileInfo(this.userForm.value);
	}

}
