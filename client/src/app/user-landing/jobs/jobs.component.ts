import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../common/services/search.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filterSlide } from '../../common/animations/filterSlide';
import { job } from '../../common/seed_data/jobs'; 
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [filterSlide]
})
export class JobsComponent implements AfterViewInit {

	displayJobs: Boolean = true;
	jobs: any;
	searchForm: FormGroup;
	user: any;
	location: String;
	@ViewChild('searchEl', { read: ElementRef }) searchEl: ElementRef;
	search: Boolean = false;
	applicants: Array<any>;

	constructor(
		private _search: SearchService,
		private fb: FormBuilder,
		private _user: UserService,
		private cd: ChangeDetectorRef
	) {
		this.createForm();

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
		console.log(this.searchForm.value)
	}

	handleLoc(val: String) {
		this.location = val;
	}

	searchClick() {
		this.search = !this.search;
	}

	createForm() {
		this.searchForm = this.fb.group({
			search: ['']
		});
	}

}
