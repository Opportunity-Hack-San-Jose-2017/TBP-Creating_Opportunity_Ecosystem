import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../common/services/search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JobsService } from '../../common/services/jobs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {

  candidates: Array<any>;
  searchForm: FormGroup;
  
  constructor(
    private _search: SearchService,
    private fb: FormBuilder,
    private _jobs: JobsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    _search.getCandidates()
      .do(v => console.log(v))
      .subscribe((v: any) => this.candidates = v)
  }
  

  createForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
} 
