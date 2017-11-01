import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';


@Injectable()
export class JobsService {
	jobs: Array<any>;
	constructor(
		private http: HttpClient,
		private _router: Router
	) { }

	postOpening(data: Object){
		const url = `${BASE_URL}/company/postOpening`;
		this.http.post(url, data, {withCredentials: true} )
			.subscribe(
				(data: any) => {
					console.log(data);
					this._router.navigate(['company/home']);
				},
				(err: HttpErrorResponse) => {
					console.log(err);
				}
			)
	}

	openingUpdate(data: Object) {
		const url = `${BASE_URL}/company/update`;
		return this.http.post(url, data, {withCredentials: true})
	}

	applyToOpening(opening_id: Number) {
		const data = {opening_id};
		const url = `${BASE_URL}/applicant/apply`;
		return this.http.post(url, data, {withCredentials: true});
	}

}
