import { Observable, Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';


@Injectable()
export class JobsService {

	jobs: Array<any>;
	applicants = new Subject();

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
					this._router.navigate(['company']);
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

	deleteOpening(opening_id: Number){
		const data = {openingId: opening_id}
		const url = `${BASE_URL}/company/cancelOpening`;
		return this.http.post(url, data, {withCredentials: true})
	}

	getApplicants(id: string) {
		return this.http.get(`${BASE_URL}/company/opening`, {
			params: new HttpParams().set('opening_id', id),
			withCredentials: true
		})
		// .subscribe(
		// 	(v: any) => {
		// 		if (v.statusCode == '200') {
		// 			console.log(v.applications)
		// 			this.applicants.next(v.applications);
		// 		} else {
		// 			console.log(v)
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.log(err);
		// 	}
		// )
	}

	pullApplicants(): Observable<any> {
		return this.applicants;
	}

}
