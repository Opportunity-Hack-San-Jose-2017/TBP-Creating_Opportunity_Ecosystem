import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as BASE_URL from '../config/url';

@Injectable()
export class CompanyService {

	constructor(
		private http: HttpClient,
		private _router: Router
	) { }

	getCompanyProfile(){
		this.http.get(`${BASE_URL}/profile`)
			.subscribe((data: any) => console.log(data))
	}

	register(data: Object){
		this.http.post(`${BASE_URL}/register`, data)
			.subscribe(
				(data: any) => {
					console.log(data);
					this._router.navigate(['company/opening/create'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	login(data: Object){
		this.http.post(`${BASE_URL}/profile`, data,{withCredentials: true })
			.subscribe(
				(data: any) => {
					console.log(data)
					this._router.navigate(['company/opening/create'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	logout(){
		return this.http.post(`${BASE_URL}/logout`, {})
	}
}
