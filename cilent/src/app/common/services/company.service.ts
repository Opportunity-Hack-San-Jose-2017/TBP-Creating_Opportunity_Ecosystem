import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
>>>>>>> 86707a5486a6b2b327d2c655c1022a4694276bc2
import { Router } from '@angular/router';
const BASE_URL = 'http://localhost:8080/company';

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
