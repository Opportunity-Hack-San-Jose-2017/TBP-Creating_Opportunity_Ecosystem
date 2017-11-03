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
	morning: Boolean = false;
	noon: Boolean = false;
	night: Boolean = false;
	graveyard: Boolean = false;
	ft: Boolean;
	pt: Boolean;
	temp: Boolean;
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

	addBg() {
		this.bg = true;
		this.notBg = false;
	}

	removeBg() {
		this.notBg = true;
		this.bg = false;
	}

}
