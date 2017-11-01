import { HttpErrorResponse } from '@angular/common/http';
import { JobsService } from '../../common/services/jobs.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-cell',
  templateUrl: './job-cell.component.html',
  styleUrls: ['./job-cell.component.css']
})
export class JobCellComponent implements OnInit {

	show = true;
	time: String = "";
	@Input() job: any;
	isAccessible: String = '';

	constructor(private _jobs: JobsService) { }

	ngOnInit() {
		this.isAccessible = this.job['publicTransport'] ? 'Yes' : 'No';
		this.time = this.job.experience === 1 ? 'year' : 'years'
	}

	toggle(){
		this.show = !this.show
	}

	apply() {
		this._jobs.applyToOpening(this.job.opening_id)
			.subscribe(
				(v: any) => {
					const curApps = JSON.parse(localStorage.getItem('apps')) || {};
					const newApps = Object.assign(curApps, this.job);
				}, (err: HttpErrorResponse) => {
					console.log(err);
				})
	}

}
