import { UploadService } from '../common/services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

	img: String;
	applicant: any;
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	morning: Boolean = false;
	noon: Boolean = false;
	night: Boolean = false;
	graveyard: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;

	constructor(
		private _user: UserService,
		private _upload: UploadService,
		private _router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.checkCircles();
	}

	ngOnInit() {	
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}

	checkCircles() {
		if (this.applicant) {
			this.applicant.shift.forEach(s => this[s] = true);
			this.applicant.availability.forEach(a => this[a] = true);
		}
	}

  	backButton(){
  		this._router.navigate(["applicant"]);
	}

	logout() {
		this._user.logout();
	}

	downloadResume() {
		this._upload.getFile(this.applicant["resumeURL"])
			.subscribe(v => importedSaveAs(v, this.applicant["resumeURL"]))
	}

}
