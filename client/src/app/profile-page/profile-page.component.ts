import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../common/services/user.service';

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
		private _router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params: Params) => {
			const userID = params.id;
			_user.getProfile(userID)
			  .do(v => console.log(v))
			  .subscribe((v: any) => this.applicant = v);
		  });
		  // test data
		// this.applicant = {
		// 	firstName: 'Sheldon',
		// 	lastName: 'Bazzell',
		// 	introduction: 'This is my intro This is my intro This is my intro This is my introThis is my introThis is my intro This is my introThis is my introThis is my introThis is my intro',
		// 	experience: 2,
		// 	email: 'sheldon@gamil.com',
		// 	phoneNumber: '12345678',
		// 	shift: ['morning', 'night'],
		// 	availability: ['pt', 'ft'],
		// 	skillsSet: ['I am a good writer, reader, listener','I am a good writer, reader, listener', 'I am a good writer, reader, listener']
		// }
		this.checkCircles();
	}

	ngOnInit() {	
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
		console.log(this.applicant)
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

}
