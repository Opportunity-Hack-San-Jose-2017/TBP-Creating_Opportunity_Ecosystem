import { Observable } from 'rxjs/Rx';
import { JobsService } from '../../common/services/jobs.service';
import { CompanyService } from '../../common/services/company.service';
import { Component, OnInit } from '@angular/core'; 
import { SearchService } from '../../common/services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent {

  applicants: Observable<any>;
  searchForm: FormGroup;
  
  constructor(
    private _search: SearchService,
    private fb: FormBuilder,
    private _jobs: JobsService
  ) {
    this.createForm();
    this.applicants = _jobs.pullApplicants();
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
}