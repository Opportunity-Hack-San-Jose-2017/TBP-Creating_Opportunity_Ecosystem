import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {

	page = 1
  constructor() { }

  ngOnInit() {
  }

  onClickNext(){
  	this.page++
  }
}
