import { Component } from '@angular/core';

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
	first: Boolean = false;
	second: Boolean = false;
	third: Boolean = false;

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

}
