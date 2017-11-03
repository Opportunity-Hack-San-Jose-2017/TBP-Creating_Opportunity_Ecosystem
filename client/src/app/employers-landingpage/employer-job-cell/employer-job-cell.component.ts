import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JobsService } from '../../common/services/jobs.service';

@Component({
  selector: 'app-employer-job-cell',
  templateUrl: './employer-job-cell.component.html',
  styleUrls: ['./employer-job-cell.component.css']
})
export class EmployerJobCellComponent implements OnInit {

	time: String = "";
	@Input() job: any;
	isAccessible: String = '';
	@Output() val = new EventEmitter();
	datePosted;

  	constructor(private _jobs: JobsService) { }

	ngOnInit() {
		this.isAccessible = this.job['publicTransport'] ? 'Yes' : 'No';
		this.time = this.job.experience === 1 ? 'year' : 'years'
		this.datePosted = new Date(this.job['date'])
		console.log(this.job)
		
	}

	applicants(){
		this._jobs.getApplicants(this.job["opening_id"])
		console.log('cell')
		// .subscribe(data => {
		// 	console.log(data)
		// })

	}

	delete(){
		this._jobs.deleteOpening(this.job["opening_id"])
		.subscribe(data => {
			console.log(data)
			location.reload()
		})
	}
}

