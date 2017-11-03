import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JobsService } from './../common/services/jobs.service'
import { Router } from '@angular/router';
import { CompanyService } from './../common/services/company.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent {

	job = {
		title: "Something",
		description: "",
		responsibilities: "",
		experience: "",
		shift: "",
		publicTransport: "",
		location: "",
		minSalary: "",
		maxSalary: ""
	}
	isNotAccessible: boolean = false;
	isAccessible: boolean = false;	

  constructor(
    private _router: Router,
    private _company: CompanyService,
    private _jobs: JobsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

	jobForm: FormGroup;
	yes: Boolean = false;
	ptYes: Boolean = false;
	first: Boolean = false;
	second: Boolean = false;
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['pt', 'ft', 'temp'];
	third: Boolean = false;
	flexible: Boolean = false;
	@ViewChild('accept', {read: ElementRef}) accept: ElementRef;

	circleClick() {
		this.ptYes = !this.ptYes;
	}

	otherClick(e: any) {
		this[e.target['id']] = !this[e.target['id']];
	}

	createForm() {
		this.jobForm = this.fb.group({
			title: ['', Validators.required],		
			description: ['', Validators.required ],		
			responsibilities: ['', Validators.required ],		
			experience: ['', Validators.required ],		
			shift: ['', Validators.required ],		
			minSalary: [''],
			maxSalary: [''],
			publicTransport: [false, Validators.required ],
			location: ['', Validators.required ]
		});
	}

	addAccess() {
		this.isAccessible = !this.isAccessible;
		this.isNotAccessible = false;
	}

	removeAccess() {
		this.isNotAccessible = !this.isNotAccessible;
		this.isAccessible = false;
	}

  testForm(){
    this._jobs.postOpening(this.job);
  }

	logout() {
		this._company.logout();
	}

	shiftClick(id: string) {
		this.shifts.forEach(s => this[s] = s === id ? !this[id] : false)
	}

	typeClick(id: any) {
		this.types.forEach(s => this[s] = s === id ? !this[id] : false)
	}

	submitOpening() {
		var obj = this.jobForm.value;
		obj["publicTransport"] = this.ptYes;
		const newObj = Object.assign(obj, {
			shift: this.shifts.filter(x => this[x])[0],
			availability: this.types.filter(x => this[x])[0]
		})
		this._jobs.postOpening(obj);
	}

	backButton(){
		this._router.navigate(['company/home'])
	}
}
