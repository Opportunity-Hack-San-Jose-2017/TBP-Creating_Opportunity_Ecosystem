import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
const BASE_URL = 'http://54.183.64.109';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  profile: any;
  setupStep = new Subject();

	login(login_cred: Object){
		const url = `${BASE_URL}/applicant/signin`;
		this.http.post(url, login_cred)
			.subscribe(
				(data: any) => {
					localStorage.setItem('user', JSON.stringify(data));
					this.router.navigate(['jobs']);
				},
				(err: HttpErrorResponse) => {
					if (err.status === 400) {
						console.log(err.message)
					}
				}
			)
	}

	updateProfile(update_cred: Object){
		const url = `${BASE_URL}/applicant/signin`;
		this.http.post(url, update_cred)
			.subscribe(
				(data: any) => {
				localStorage.setItem('user', JSON.stringify(data));
				this.router.navigate(['jobs']);
				},
				(err: HttpErrorResponse) => {
					console.log(err);
					if (err.status === 400) {
						console.log(err.message)
					}
				}
			)
	}

	register(registration_cred: Object) {
		const url = `${BASE_URL}/applicant/register`;
		this.http.post(url, registration_cred, {withCredentials:true})
			.subscribe(
				(data: any) => {
					localStorage.setItem('user', JSON.stringify(data));
					this.router.navigate(['setup']);
				},
				(err: HttpErrorResponse) => {
					console.log(err);
					if (err.status === 400){
						console.log(err.message)
					}
				}
			)
	}

	logout() {
		const url = `${BASE_URL}/applicant/logout`;
		return this.http.post(url, {});
	}

	getSession(){
		const url = `${BASE_URL}/applicant/activeSession`;
		this.http.get(url)
			.subscribe(
				(data: any) => console.log(data),
				(err: HttpErrorResponse) => console.log(err)
				)
	}

	getProfile(id: String) {
		const url = `${BASE_URL}/profile/${id}`;
		this.http.get(url)
			.subscribe(
				(data: any) => this.profile = data,
				(err: HttpErrorResponse) => console.log(err)
			)
	}

	sendProfileInfo(data: Object) {
		const num = Number(localStorage.getItem('setupStep')) + 1;
		localStorage.setItem('setupStep', num.toString());
		this.setupStep.next(num);
		const stor = localStorage.getItem('profile') || '';
		const obj = stor !== '' ? JSON.parse(stor) : {};
		const updatedObj = Object.assign(obj, data);
		localStorage.setItem('profile', JSON.stringify(updatedObj));
		if (num === 4) {
			this.register(updatedObj);
			this.router.navigate(['jobs']);
		}
	}
  
	stepBack() {
		const num = Number(localStorage.getItem('setupStep')) - 1;
		localStorage.setItem('setupStep', num.toString())
		this.setupStep.next(num);
	}

	getSetupStep(): Observable<any> {
		return this.setupStep;
	}
}
