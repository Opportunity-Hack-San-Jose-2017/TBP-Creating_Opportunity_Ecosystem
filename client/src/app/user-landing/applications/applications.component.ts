import { UserService } from '../../common/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {

	apps: Array<any>;
	
	constructor(private _user: UserService) {
		_user.getApplications()
			.subscribe((v: any) => this.apps = v.openings);
	}


}
