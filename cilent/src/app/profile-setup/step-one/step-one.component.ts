import { UserService } from '../../common/services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
	
	img: String;	
	user = {telephone: ''};
	@Input() name: any;

	constructor(private _user: UserService) { }

	ngOnInit() {
		if (!this.img) this.img = '../../assets/images/profile-icon.png';
	}

	handleClick(val: Object) {
		this._user.sendProfileInfo(val);
	}

}
