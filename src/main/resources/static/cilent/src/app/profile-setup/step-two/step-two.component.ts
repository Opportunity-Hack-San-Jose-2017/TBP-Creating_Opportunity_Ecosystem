import { UserService } from '../../common/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent {

	user = {location: '', languages: '', availability: [], jobType: []}

	constructor(private _user: UserService) { }

	handleClick(val: Object) {
		this._user.sendProfileInfo(val);
	}

}
