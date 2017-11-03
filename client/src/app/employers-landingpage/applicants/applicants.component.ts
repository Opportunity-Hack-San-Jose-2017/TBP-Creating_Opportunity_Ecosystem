import { Observable } from 'rxjs/Rx';
import { JobsService } from '../../common/services/jobs.service';
import { CompanyService } from '../../common/services/company.service';
import { Component, OnInit } from '@angular/core'; 
import { SearchService } from '../../common/services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent {

  applicants: Array<any>;
  searchForm: FormGroup;
  
  constructor(
    private _search: SearchService,
    private fb: FormBuilder,
    private _jobs: JobsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      const jobId = params.id;
      _jobs.getApplicants(jobId)
        .do(v => console.log(v))
        .subscribe((v: any) => this.applicants = v.applications);
    });
  }
  

  createForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
}