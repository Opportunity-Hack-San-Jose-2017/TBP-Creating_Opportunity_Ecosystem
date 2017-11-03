import { Component, OnInit } from '@angular/core';
import { UserService } from './../common/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	user: any;
  constructor(private _user: UserService) { }

  ngOnInit() {
  	this._user.getProfile("1")
  	this.user = this._user.profile
  }

}
