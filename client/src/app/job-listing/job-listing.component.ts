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

	constructor(
		private _router: Router,
		private _company: CompanyService,
		private _jobs: JobsService,
		private fb: FormBuilder
	) {
		this.createForm();
	}

	jobForm: FormGroup;
	ptYes: Boolean = false;
	hourly: Boolean = false;
	shifts: any = ['morning', 'noon', 'night', 'graveyard'];
	types: any = ['pt', 'ft', 'temp'];
	@ViewChild('accept', {read: ElementRef}) accept: ElementRef;

	isAccessible() {
		this.ptYes = !this.ptYes;
	}

	isHourly() {
		this.hourly = !this.hourly;
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
		const obj = Object.assign(this.jobForm.value, {
			publicTransport: this.ptYes,
			salary: this.hourly,
			shift: this.shifts.filter(x => this[x])[0],
			availability: this.types.filter(x => this[x])[0]
		})
		this._jobs.postOpening(obj);
	}

	backButton(){
		this._router.navigate(['company'])
	}
}
