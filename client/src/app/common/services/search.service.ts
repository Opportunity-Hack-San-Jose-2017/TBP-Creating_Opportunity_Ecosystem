import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class SearchService {

	jobs: Array<any>;

  	constructor(private _http: HttpClient) { }

  	getAllJobs(){
  		return this._http.get(`${BASE_URL}/applicant/allJobs`, {withCredentials:true});
  	}

  	getJobBySkill(skill: String) {
  		// return this._http.post('/')
  	}
}
