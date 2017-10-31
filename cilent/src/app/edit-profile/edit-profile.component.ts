import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	img: String;
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

	user = {
		password: "",
		introduction: "",
		verified: "",
		hashValue: "",
		location: "",
	}

	ngOnInit() {
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}
  
	createForm() {
		this.userForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['' ],
			skillsSet: [''],
			experiences: ['']
		});
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
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
		const newObj = Object.assign(this.user, obj);
		this._user.sendProfileInfo(newObj);
	}
  

}
