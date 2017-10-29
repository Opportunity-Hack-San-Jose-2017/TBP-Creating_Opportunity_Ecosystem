import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApplyService {

  constructor(private http: Http) { }

  	applyToJob(opening_id: Number){
  		var data = {
  			opening_id: opening_id
  		}
  		return this.http.post('/applicant/apply', data)
  	}
}
