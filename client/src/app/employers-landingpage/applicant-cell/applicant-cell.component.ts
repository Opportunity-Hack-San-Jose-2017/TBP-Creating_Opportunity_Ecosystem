import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from './../../common/services/company.service';
import { Router } from '@angular/router';
import { JobsService } from './../../common/services/jobs.service';
import { UploadService } from './../../common/services/upload.service';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-applicant-cell',
  templateUrl: './applicant-cell.component.html',
  styleUrls: ['./applicant-cell.component.css']
})
export class ApplicantCellComponent {

	@Input() applicant: any;
  user: any
  isAccessible: String = "";
  constructor(
  	private _company: CompanyService,
  	private router: Router,
    private upload: UploadService
		) {
		}

		ngOnInit() {
			console.log(this.applicant)		
      this.user = this.applicant["applicant"];
      this.isAccessible = this.user['publicTransport'] ? 'Yes' : 'No';
    }

  interviewApplicant(){
  	this._company.acceptApplicant({applicationId: this.applicant["application_id"]})
  }

  reject(){
    this._company.rejectApplicant({applicationId: this.applicant["application_id"] })
  }

  downloadResume(){
    console.log(this.applicant["applicant"]["resumeURL"])
		this.upload.getFile(this.applicant["applicant"]["resumeURL"])
			.subscribe(v => importedSaveAs(v, this.applicant["resumeURL"]))
  }
}
