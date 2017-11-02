import { Observable } from 'rxjs/Rx';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

	bg: Boolean;
	notBg: Boolean;
	ft: Boolean = false;
	pt: Boolean = false;
	temp: Boolean = false;
	morning: Boolean = false;
	noon: Boolean = false;
	night: Boolean = false;
	graveyard: Boolean = false;
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['ft', 'pt', 'temp'];
	
	@Output() val = new EventEmitter();
	@Output() loc = new EventEmitter();

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
		if (this[e.target['id']] === true) {
			console.log(this[e.target['id']], e.target['id'])
			this.val.emit(e.target['id']);
		}
	}

}
