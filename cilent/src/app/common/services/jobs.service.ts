import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class JobsService {

	jobs = []

  constructor(private http: Http) { }

  //compannies new job
  postOpening(data: Object){
  	return this.http.post("/company/postOpening", data)
  }

  //compannies update
  openingUpdate(data: Object){
  	return this.http.post("/company/update", data)
  }

  //job seekers apply
  applyToOpenging(opening_id: Number) {
  	var data = {
  		opening_id: opening_id
  	}
  	return this.http.post("/applicant/apply", data)
  }

}
