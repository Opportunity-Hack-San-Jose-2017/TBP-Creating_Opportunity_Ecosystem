import { RequestOptions, ResponseContentType } from '@angular/http';
import { UploadService } from '../common/services/upload.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { url as BASE_URL } from '../common/config/url';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	img: String;
	userForm: FormGroup;
	progress: any; 
	morning: Boolean = false;
	noon: Boolean = false;
	night: Boolean = false;
	graveyard: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;
	user: any = {
		"availability": [""],
		"shift": [""],
		"skillsSet":[""]
	}

	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	success: Boolean = true;
	failed: Boolean = false;
	@ViewChild('resume', {read:ElementRef}) resume: ElementRef;

	constructor(
		private _user: UserService,
		private fb: FormBuilder,
		private _router: Router,
		private _upload: UploadService,
		private _http: HttpClient
	) {
		this.user = JSON.parse(localStorage.getItem("user"));
		this.checkCircles();
		this.createForm();
		_upload.getSuccessMsg().subscribe((v: any) => this.success = v)
		_upload.getFailedMsg().subscribe((v: any) => this.failed = v)
	}

	ngOnInit() {	
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
		console.log(this.user)
	}

	checkCircles() {
		if (this.user) {
			this.user.shift.forEach(s => this[s] = true);
			this.user.availability.forEach(a => this[a] = true);
		}
	}

	labelClick(e: Event) {
		if (e.target['id'] !== 'lbl') {
			this.resume.nativeElement.click();
			console.log(e)
		}
	}

	createForm() {
		if (this.user) {
			var tempSkillsSet = this.user.skillsSet.join(", ");
			this.userForm = this.fb.group({
				firstName: [this.user.firstName, Validators.required],
				lastName: [this.user.lastName, Validators.required],
				experience: [this.user.experience],
				phoneNumber: [this.user.phoneNumber],
				skillsSet: [tempSkillsSet],
				introduction: [this.user.introduction]
			});
		} else {
			this.userForm = this.fb.group({
				firstName: ["", Validators.required],
				lastName: ["", Validators.required],
				experience: [0],
				phoneNumber: [""],
				skillsSet: [""],
				introduction: [""]
			})
		}
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

	handleClick() {
		const obj = Object.assign(this.userForm.value, {
			shift: this.shifts.filter(x => this[x]),
			availability: this.types.filter(x => this[x])
		})
		try {
			var temp = this.userForm.value.skillsSet.split(",")
		} catch(err) {
			temp = []
		}
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].trim();
		}
		obj["skillsSet"] = temp;
		console.log(obj)
		this._user.updateProfile(obj);

	}

	closeMsg() {
		this._upload.closeMsg();
	}
  	
  	backButton(){
  		this._router.navigate(["applicant"]);
	}

	handleFiles(e: Event) {
		const x = e.target['files'];
		const file = x.item(0);
		console.log(file);
		this._upload.sendFile(file)
			.do(data =>{
				this._http.post(`${BASE_URL}/applicant/update`, {resumeURL: file["name"]}, {withCredentials: true})
				.subscribe(data => {
					console.log("This is from update", data)
				})
			})
			.subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if (event instanceof HttpResponse) {
					this.success = true;
					this._user.updateProfile({file:file['name']})
					console.log('File is completely uploaded!');
				}
			})
	}

	logout() {
		this._user.logout();
	}

}
