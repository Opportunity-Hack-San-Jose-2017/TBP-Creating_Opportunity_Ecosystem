import { Component } from '@angular/core';

@Component({
	selector: 'app-company-home',
	templateUrl: './company-home.component.html',
	styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent {

	login: Boolean = true;

	constructor() {
		console.log('company home')
	}

	handleClick(id: String) {
		this.login = id === 'login' ? true : false;
	}

}
