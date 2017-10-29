import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  img: String;

  constructor() { }

  user = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    introduction: "",
    experience: "",
    skillsSet: "",
    verified: "",
    hashValue: "",
    location: '',
    languages: '',
    availability: {morning:false, noon:false, night:false, graveyard:false},
    jobType: {fullTime:false, partTime:false, temp:false}
  }

	ngOnInit() {
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}

}
