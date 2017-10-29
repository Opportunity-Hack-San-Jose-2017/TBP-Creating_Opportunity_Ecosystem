import { Component, OnInit } from '@angular/core';
import { JobsService } from './../common/services/jobs.service'
import { Router } from '@angular/router';
import { CompanyService } from './../common/services/company.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

	job = {
		title: "",
		description: "",
		responsibilities: "",
		experience: "",
		shift: "",
		location: "",
		minSalary: "",
		maxSalary: ""
	}

  constructor(private jobs: JobsService, private router: Router, private _company: CompanyService) { }

  ngOnInit() {
  }

  submitOpening(job){
    job.minSalary = 1;
    job.maxSalary = 5;
    console.log(job)
  	this.jobs.postOpening(job)
  }

  testProfile(){
    this._company.getCompanyProfile()
  }
}
