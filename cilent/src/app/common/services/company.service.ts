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
		this.http.post(`${BASE_URL}/company/register`, data, {withCredentials: true})
			.subscribe(
				(data: any) => {
					console.log(data);
					if (data["statusCode"] == "200") {
						localStorage.setItem("company", JSON.stringify(data["company"]))
						this._router.navigate(['/company/home'])
					}
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	login(data: Object){
		this.http.post(`${BASE_URL}/company/signin`, data,{withCredentials: true })
			.subscribe(
				(data: any) => {
					if (data["statusCode"] == "200") {
						this._router.navigate(['company/home'])
					} else {
						console.log(data)
						alert(data["message"])
					}				
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	logout(){
		this.http.post(`${BASE_URL}/company/logout`, {}, {withCredentials: true})
		.subscribe(data => {
			console.log(data)
		})
		this._router.navigate(["company/login"])
	}
}
