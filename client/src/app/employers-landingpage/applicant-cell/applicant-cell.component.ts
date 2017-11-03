import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';
import { Router } from '@angular/router';
import { JobsService } from './../../common/services/jobs.service';

@Component({
  selector: 'app-applicant-cell',
  templateUrl: './applicant-cell.component.html',
  styleUrls: ['./applicant-cell.component.css']
})
export class ApplicantCellComponent implements OnInit {

	applicant: any;
  user = this.applicant["applicant"];
  isAccessible: Boolean;
  constructor(
  	private _company: CompanyService,
  	private router: Router
  	) { }

  ngOnInit() {
  }

  interviewApplicant(){
  	this._company.acceptApplicant({application_id: this.applicant["application_id"]})
  	.subscribe(data => {
  		if (data["statusCode"] == "200"){
  			this.router.navigate(['/company/home'])
  		} else  {
  			alert(data["message"])
  		}
  	})
  }

  reject(){
    this._company.rejectApplicant({applicationId: this.applicant["application_id"] })
  }
}
