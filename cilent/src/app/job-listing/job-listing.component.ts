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

  constructor(
    private router: Router,
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
	third: Boolean = false;
	flexible: Boolean = false;
	@ViewChild('accept', {read: ElementRef}) accept: ElementRef;

	circleClick() {
		this.ptYes = !this.ptYes;
	}

	createForm() {
		this.jobForm = this.fb.group({
			title: ['', Validators.required],		
			description: ['', Validators.required ],		
			responsibilities: ['', Validators.required ],		
			experience: [0, Validators.required ],		
			shift: ['', Validators.required ],		
			minSalary: [0],
			maxSalary: [0],
			publicTransport: [false, Validators.required ],
			location: ['', Validators.required ],
		});
	}

  testForm(){
    this._jobs.postOpening(this.job)
  }

	logout() {
		this._company.logout();
	}

	shiftClick(e: Event) {
		this[e.target['id']] = !this[e.target['id']];
	}

	submitOpening() {
		console.log(this.jobForm.value);
		const obj = this.jobForm.value
		this._jobs.postOpening(this.jobForm.value)
	}
}
