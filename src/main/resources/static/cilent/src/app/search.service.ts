import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class SearchService {

	jobs = []

  	constructor(private _http: Http) { }

  	getAllJobs(){
  		return this._http.get('/applicant/getJobs')
  	}

  	// getJobBySkill(skill: String){
  	// 	return this._http.post('/', )
  	// }
}
