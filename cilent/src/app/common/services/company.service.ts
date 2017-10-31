import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { url as BASE_URL } from '../config/url';

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
		this.http.post(`${BASE_URL}/company/register`, data)
			.subscribe(
				(data: any) => {
					console.log(data);
					this._router.navigate(['company'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	login(data: Object){
		console.log("getting here")
		this.http.post(`${BASE_URL}/company/signin`, data,{withCredentials: true })
			.subscribe(
				(data: any) => {
					console.log(data)
					this._router.navigate(['company/opening/create'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	logout(){
		return this.http.post(`${BASE_URL}/company/logout`, {})
	}
}
