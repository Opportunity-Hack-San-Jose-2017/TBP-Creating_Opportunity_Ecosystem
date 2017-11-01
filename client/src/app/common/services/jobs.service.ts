import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';
import { Router } from '@angular/router';


@Injectable()
export class JobsService {
	jobs: Array<any>;
	constructor(
		private http: HttpClient,
		private _router: Router
		) { }

  // private generateOptions(): RequestOptions {
  //   let headers = new Headers();
  //   headers.append("Content-Type", 'application/json');
  //   headers.append("Access-Control-Allow-Origin", "*");
  //   headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type");
  //   return new RequestOptions({ headers: headers });
  // }

	//companies new job
	postOpening(data: Object){
		const url = `${BASE_URL}/company/postOpening`;
		this.http.post(url, data, {withCredentials: true} )
			.subscribe(
				(data: any) => {
					console.log(data);
					if (data["statusCode"] == "200") {
						this._router.navigate(["company/home"])
					}
				},
				(err: HttpErrorResponse) => {
					console.log(err);
				}
			)
	}

	//compannies update
	openingUpdate(data: Object) {
		const url = `${BASE_URL}/company/update`;
		return this.http.post(url, data, {withCredentials: true})
	}

	//job seekers apply
	applyToOpening(opening_id: Number) {
		const data = {opening_id: opening_id};
		const url = `${BASE_URL}/applicant/apply`;
		return this.http.post(url, data, {withCredentials: true});
	}

}
