import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	user: any = {
		"email":"",
		"token": "",
		"password":"",
		"firstName":"",
		"lastName":"",
		"phoneNumber": "",
		"availability":[''],
		"shift":[''],
		// "position":null,
		"introduction":"",
		"experience":"",
		"education":"",
		"verified":false,
		"hashValue":"",
		// "city":null,
		// "country":null,
		// "rating":0,
		// "numberOfRatings":0,
		"skillsSet":[],
		"pendingApplications":0
		// "imageUrl":null
	}
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	success: Boolean = true;
	failed: Boolean = false;

	constructor(
		private _user: UserService,
		private fb: FormBuilder,
		private _router: Router
	) {
		this.createForm();
		this.checkCircles();
		this.user = localStorage.getItem("user") || this.user;
		_user.getSuccessMsg().subscribe((v: any) => this.success = v)
		_user.getFailedMsg().subscribe((v: any) => this.failed = v);
	}

	ngOnInit() {		
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
		this.user = JSON.parse(localStorage.getItem("user"))
		console.log(this.user)
	}

	checkCircles() {
		this.user.shift.forEach(s => this[s] = true);
		this.user.availability.forEach(a => this[a] = true);
	}
  
	createForm() {
		this.userForm = this.fb.group({
			firstName: [ "", Validators.required],
			lastName: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			phone: [""],
			skillsSet: "",
			experiences: [""]
		});
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

	handleClick() {
		const obj = Object.assign(this.userForm.value, {
			shift: this.shifts.filter(x => this[x]),
			availability: this.types.filter(x => this[x])
		})
		var temp = this.userForm.value.skillsSet.split(",")
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].trim();
		}
		obj["skillsSet"] = temp;
		const newObj = Object.assign(this.user, obj);
		console.log(newObj)
		//this broke the front page, fixing when we meet.
		// this._user.updateProfile(newObj);
	}

	closeMsg() {
		this._user.closeMsg()
	}
  	
  	backButton(){
  		this._router.navigate(["applicant"]);
	}
	  
	  handleFile(e: Event) {
		const files = e.target['files'];
		for (let i = 0; i < files.length; i++) {
			const file = {name:this.user.id, file:window.URL.createObjectURL(files[i])};
			this._user.uploadResume(file);
		}
	}

	logout() {
		this._user.logout();
	}

}
