import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

	toggleDropDown = false;
  constructor() { }

  ngOnInit() {
  }

  dropdowntoggle() {
  	this.toggleDropDown = !this.toggleDropDown
  }

}
