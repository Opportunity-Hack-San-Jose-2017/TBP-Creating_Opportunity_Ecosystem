import { UserService } from '../../common/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {

	apps: Array<any>;
	searchForm: FormGroup;
	constructor(
		private _user: UserService,
		private fb: FormBuilder,
	  ) {
		  this.createForm();
		_user.getApplications()
			.subscribe((v: any) => this.apps = v.openings);
	}

	createForm() {
		this.searchForm = this.fb.group({
		  search: ['']
		});
	  }


}
