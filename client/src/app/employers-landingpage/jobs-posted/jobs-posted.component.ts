import { Observable } from 'rxjs/Rx';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../../common/services/search.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { filterSlide } from '../../common/animations/filterSlide';
@Component({
  selector: 'app-jobs-posted',
  templateUrl: './jobs-posted.component.html',
  styleUrls: ['./jobs-posted.component.css'],
  animations: [filterSlide]
})
export class JobsPostedComponent {

	toggleJobs: Boolean = true;
	applicants: Array<any>;
	jobs: Array<any>;
	searchForm: FormGroup;
	user: any;
	location: String;
	@ViewChild('searchEl', { read: ElementRef }) searchEl: ElementRef;
	search: Boolean = false;

	constructor(
		private _search: SearchService,
		private fb: FormBuilder
	) {
		this.createForm();
		this._search.getAllJobs()
			.subscribe((v: any) => this.jobs = v.openings);

		/* allow user to search by pressing 'enter' */
		Observable.fromEvent(document, 'keyup')
			.filter((v: any) => v.keyCode === 13)
			.subscribe(() => {
				if (document.getElementById('mat-input-0') === document.activeElement) {
					if (this.searchForm.value.search !== "") {
						_search.filterJobs(this.searchForm.value)
							.subscribe((v: any) => this.jobs = v.openings);
					} else {
						_search.getAllJobs()
							.subscribe((v: any) => this.jobs = v.openings);
					}
				}
			})
	}

	ngAfterViewInit() {
		this._search.getAllJobs()
			.subscribe((v: any) => this.jobs = v.openings);
	}

	handleSearch(e: Event) {
		this.search = false;
		this.searchForm.value.search += this.location;
		if (this.searchForm.value.search !== "") {
			this._search.filterJobs(this.searchForm.value)
				.subscribe((v: any) => this.jobs = v.openings);
		} else {
			this._search.getAllJobs()
				.subscribe((v: any) => this.jobs = v.openings);
		}
		this.location = "";
		this.searchForm.value.search = "";
	}

	handleVal(value: String) {
		this.searchForm.value.search += value;
	}

	handleLoc(val: String) {
		this.location = val;
	}

	searchClick() {
		this.search = !this.search;
	}

	createForm() {
		this.searchForm = this.fb.group({search: ['']});
	}

}
