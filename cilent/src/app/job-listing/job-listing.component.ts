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
		title: "",
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
    private jobs: JobsService, 
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

	handleCheck() {
		this.yes = !this.yes;
	}

	createForm() {
		this.jobForm = this.fb.group({
			description: ['', Validators.required ],		
			responsibilities: ['', Validators.required ],		
			experience: ['', Validators.required ],		
			shift: ['', Validators.required ],		
			minSalary: [''],
      maxSalary: [''],
      publicTransport: ['', Validators.required ],
      location: ['', Validators.required ],
		});
  }

  submitOpening() {
    this._jobs.postOpening(this.jobForm.value)
  }
  

  testProfile(){
    this._company.getCompanyProfile()
  }
}
