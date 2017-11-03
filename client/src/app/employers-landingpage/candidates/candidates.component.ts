import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../common/services/search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobsService } from '../../common/services/jobs.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  candidates: Array<any>;
  searchForm: FormGroup;
  location: String;
  search: boolean = false;
  
  constructor(
    private _search: SearchService,
    private fb: FormBuilder,
    private _jobs: JobsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    _search.getCandidates()
      .do(v => console.log(v))
      .subscribe((v: any) => this.candidates = v)

      Observable.fromEvent(document, 'keyup')
			.filter((v: any) => v.keyCode === 13)
			.subscribe(() => {
				if (document.getElementById('mat-input-0') === document.activeElement) {
					if (this.searchForm.value.search !== "") {
						_search.filterJobs(this.searchForm.value)
							.subscribe((v: any) => this.candidates = v.openings); /* CHANGE THIS !!!!!!!!!!!!!!! for the whole component*/
					} else {
						_search.getAllJobs()
							.subscribe((v: any) => this.candidates = v.openings);
					}
				}
			})
  }
  

  createForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }


  handleSearch(e: Event) {
		this.search = false;
		this.searchForm.value.search += this.location;
		if (this.searchForm.value.search !== "") {
			this._search.filterJobs(this.searchForm.value)
				.subscribe((v: any) => this.candidates = v.openings);
		} else {
			this._search.getAllJobs()
				.subscribe((v: any) => this.candidates = v.openings);
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
} 
