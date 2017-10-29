import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';

@Injectable()
export class SearchService {

	jobs = []

  	constructor(private _http: HttpClient) { }

  	getAllJobs(){
  		return this._http.get('/applicant/getJobs')
  	}

  	getJobBySkill(skill: String){
  		// return this._http.post('/')
  	}
}
