import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class SearchService {

	jobs: Array<any>;

  	constructor(
		private _http: HttpClient
	) {
	}

  	getAllJobs() {
		return this._http.get(`${BASE_URL}/applicant/allJobs`, {withCredentials:true})
	}
	  
	getCandidates(val: any) {
		return this._http.get(`${BASE_URL}/company/searchApplicants`, {
			params: new HttpParams().set('min_ratings', '0').set('min_experience', '0'),
			withCredentials:true
		})
  	}

  	getJobBySkill(skill: string) {
  		// return this._http.post('/')
	}
	
	filterJobs(query: any) {
		return this._http.get(`${BASE_URL}/applicant/search`, {
			params: new HttpParams().set('query', query.search),
			withCredentials: true
		})
	}
	
}
