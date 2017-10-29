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

<<<<<<< HEAD
  	getJobBySkill(skill: String){
  		// return this._http.post('/')
  	}
=======
  	// getJobBySkill(skill: String){
  	// 	return this._http.post('/', )
  	// }
>>>>>>> 3e3bcc794648df720f641e31646f712ddc6d3721
}
