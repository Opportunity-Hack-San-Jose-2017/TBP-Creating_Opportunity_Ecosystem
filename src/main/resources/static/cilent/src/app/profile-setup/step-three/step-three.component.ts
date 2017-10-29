import { UserService } from '../../common/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent {

  constructor(private _user: UserService) { }

	handleClick(val: Object) {
		this._user.sendProfileInfo(val);
	}

}
