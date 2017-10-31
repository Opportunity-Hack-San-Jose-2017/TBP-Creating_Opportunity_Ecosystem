import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

	jobs: Array<any>;

  	constructor(private _http: HttpClient) { }

  	getAllJobs(){
  		return this._http.get('/applicant/getJobs');
  	}

  	getJobBySkill(skill: String){
  		// return this._http.post('/')
  	}
}
