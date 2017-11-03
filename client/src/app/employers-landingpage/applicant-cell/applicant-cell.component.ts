import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-cell',
  templateUrl: './applicant-cell.component.html',
  styleUrls: ['./applicant-cell.component.css']
})
export class ApplicantCellComponent implements OnInit {

	applicant: any;
  constructor(
  	private _company: CompanyService,
  	private router: Router
  	) { }

  ngOnInit() {
  }

  interviewApplicant(){
  	this._company.acceptApplicant({applicantion_id: this.applicant["applicant_id"]})
  	.subscribe(data => {
  		if (data["statusCode"] == "200"){
  			this.router.navigate(['/company/home'])
  		} else  {
  			alert(data["message"])
  		}
  	})
  }
}
