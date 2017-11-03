import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../common/services/company.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../common/services/upload.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

	@Input() applicant: any;
  user: any
  isAccessible: Boolean;
  constructor(
  	private _company: CompanyService,
  	private router: Router,
    private upload: UploadService
		) {
		}

		ngOnInit() {
			console.log(this.applicant)		
      this.user = this.applicant["applicant"];	
    }

  interviewApplicant(){
  	this._company.acceptApplicant({applicationId: this.applicant["application_id"]})
  }

  downloadResume(){
    this.upload.getFile(this.applicant["resumeURL"])
  }
}
