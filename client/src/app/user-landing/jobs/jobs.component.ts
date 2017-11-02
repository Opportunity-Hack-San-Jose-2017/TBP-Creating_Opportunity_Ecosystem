import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../common/services/search.service';
import {
	AfterViewInit,
	animate,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	state,
	style,
	transition,
	trigger,
	ViewChild,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';

const job = {
	shift: 'Morning',
	type: 'Part Time',
	title: 'Baker',
	company: 'Paypal',
	description: 'This job has a lot of description',
	responsibilites: 'The job requires the baker to bake bread, cookies, and cake.',
	publicTransport: true,
	location: 'Berkeley',
	experience: 1
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
	  trigger('slideAnimation',
		  [
			  transition(':enter', [
				  style({ transform: 'scaleY(0)' }),
				  animate('190ms', style({ transform: 'scaleY(1)' }))
			  ]),
			  transition(':leave', [
				  style({ transform: 'scaleY(1)' }),
				  animate('190ms', style({ transform: 'scaleY(0)' }))
			  ])
		  ]
	  )]
})
export class JobsComponent implements AfterViewInit {

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

		Observable.fromEvent(document, 'keyup')
			.filter((v: any) => v.keyCode === 13)
			.subscribe(() => {
				if (document.getElementById('mat-input-0') === document.activeElement) {
					if (this.searchForm.value.search !== "") {
						_search.filterJobs(this.searchForm.value)
							.do(v => console.log(v))
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
