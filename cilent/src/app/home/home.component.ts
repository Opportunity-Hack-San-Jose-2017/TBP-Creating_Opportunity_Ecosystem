import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	login: Boolean = true;

	handleClick(id: String) {
		this.login = id === 'login' ? true : false;
	}
}
