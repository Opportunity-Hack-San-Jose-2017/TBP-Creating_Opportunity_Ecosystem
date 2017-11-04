import { RequestOptions, ResponseContentType } from '@angular/http';
import { UploadService } from '../common/services/upload.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { url as BASE_URL } from '../common/config/url';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

	img: string;
	imgLoading: boolean;
	userForm: FormGroup;
	progress: any; 
	morning: boolean = false;
	noon: boolean = false;
	night: boolean = false;
	graveyard: boolean = false;
	ft: boolean;
	pt: boolean;
	temp: boolean;
	user: any = {
		"availability": [""],
		"shift": [""],
		"skillsSet":[""]
	}

	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	success: boolean = true;
	failed: boolean = false;
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
		if (!this.user.imgUrl) this.img = '../../assets/images/profile-icon.png';
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
		this._user.updateProfile(obj);

	}

	closeMsg() {
		this._upload.closeMsg();
	}
  	
  	backButton(){
  		this._router.navigate(["applicant"]);
	}

	handleFiles(e: Event, str: string) {
		const x = e.target['files'];
		const file = x.item(0);
		this._upload.sendFile(file).subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if (event instanceof HttpResponse && event.status === 200) {
					this.success = str === 'resumeUrl' ? true : false;
					console.log(str, file)
					this._user.updateProfile({str:file['name']})
					str === 'imageUrl' ? this.getImg(file['name']) : null;
				} else {
					this.failed = true;
				}
			})
	}

	getImg(url: string) {
		this.imgLoading = true;
		this._upload.getFile(url).subscribe((data: any) => {
			this.imgLoading = false;
			this.createImageFromBlob(data);
		}, (error: any) => {
			this.imgLoading = false;
			console.log(error);
		});
	}


	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			this.img = reader.result;
		}, false);

		if (image) {
			reader.readAsDataURL(image);
		}
	}

	logout() {
		this._user.logout();
	}

}
