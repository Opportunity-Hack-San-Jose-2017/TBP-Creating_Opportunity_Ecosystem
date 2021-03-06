import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../common/services/company.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../common/services/upload.service';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

	@Input() candidate: any;
	user: any
	isAccessible: String = "";
	
	constructor(
		private _company: CompanyService,
		private router: Router,
		private upload: UploadService
	) { }

	ngOnInit() {
		this.isAccessible = this.candidate['publicTransport'] ? 'Yes' : 'No';
    }

	interviewApplicant(){
		this._company.acceptApplicant({applicationId: this.candidate["application_id"]})
	}

	downloadResume() {
		this.upload.getFile(this.candidate["resumeURL"])
			.subscribe(v => importedSaveAs(v, this.candidate["resumeURL"]))
	}
}
