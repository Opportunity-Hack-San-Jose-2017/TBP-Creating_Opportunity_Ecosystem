import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class JobsService {

	jobs = []

  

  constructor(private http: HttpClient) { }

  // private generateOptions(): RequestOptions {
  //   let headers = new Headers();
  //   headers.append("Content-Type", 'application/json');
  //   headers.append("Access-Control-Allow-Origin", "*");
  //   headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type");
  //   return new RequestOptions({ headers: headers });
  // }
  
  //compannies new job
  postOpening(data: Object){
    let headers = new Headers()
    console.log(data)
  	this.http.post("http://localhost:8080/company/postOpening", data)
    .subscribe(data => console.log(data))
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
