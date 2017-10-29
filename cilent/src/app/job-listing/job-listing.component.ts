import { Component, OnInit } from '@angular/core';
import { JobsService } from './../common/services/jobs.service'
import { Router } from '@angular/router';

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
		publicTransport: "false",
		location: "",
		minSalary: "",
		maxSalary: ""
	}

  constructor(private jobs: JobsService, private router: Router) { }

  ngOnInit() {
  }

  submitOpening(){
  	this.jobs.postOpening(this.job)
  	.subscribe(data => {
  		this.router.navigate(['/'])
  	})
  }
}
