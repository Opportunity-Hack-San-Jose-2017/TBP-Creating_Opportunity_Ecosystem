import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CompanyService {

	constructor(
		private http: HttpClient,
		private _router: Router
	) { }

	getCompanyProfile(){
		this.http.get('http://54.183.64.109/company/profile')
			.subscribe((data: any) => console.log(data))
	}

	register(data: Object){
		this.http.post('http://54.183.64.109/company/register', data)
			.subscribe(
				(data: any) => {
					this._router.navigate(['/company/opening/create'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	login(data: Object){
		this.http.post('http://54.183.64.109/company/signin', data,{withCredentials: true })
			.subscribe(
				(data: any) => {
					console.log(data)
					this._router.navigate(['/company/opening/create'])
				}, (error: HttpErrorResponse) => {
					console.log(error)
				})
	}

	logout(){
		return this.http.post('http://54.183.64.109/company/logout', {})
	}
}
