import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class UserService {

	profile: any;
	setupStep = new Subject();
	successMessage = new BehaviorSubject(false);
	failedMessage = new BehaviorSubject(false);

	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	login(login_cred: Object){
		const url = `${BASE_URL}/applicant/signin`;
		this.http.post(url, login_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					if (data["statusCode"]== "200"){
						localStorage.setItem('user', JSON.stringify(data.applicant)) || {};
						this.router.navigate(['applicant']);
					} else {
						alert(data["message"])
					}
				},
				(err: HttpErrorResponse) => {
					if (err.status === 400) {
						console.log(err.message)
					}
				}
			)
	}

	updateProfile(update_cred: Object){
		const url = `${BASE_URL}/applicant/update`;
		this.http.post(url, update_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					if (data["statusCode"] == 200){
						localStorage.setItem('user', JSON.stringify(data.applicant));
						this.router.navigate(['applicant']);
					} else {
						console.log(data);
					}
				},
				(err: HttpErrorResponse) => {
					console.log(err);
				}
			)
	}

	register(registration_cred: Object) {
		const url = `${BASE_URL}/applicant/register`;
		this.http.post(url, registration_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					console.log(data);
					localStorage.setItem('user', JSON.stringify(data.applicant));
					this.login({email:data.applicant['email'], password:data.applicant['password']})
				},
				(err: HttpErrorResponse) => {
					console.log(err);
					if (err.status === 400){
						console.log(err.message);
					}
				}
			)
	}

	logout() {
		const url = `${BASE_URL}/applicant/logout`;
		this.http.post(url, {}, {withCredentials: true})
			.subscribe(data => {
				console.log(data);
				this.router.navigate(['/']);
			})
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
			localStorage.removeItem('setupStep');
			localStorage.removeItem('profile');			
			this.updateProfile(updatedObj);
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

	getApplications(): Observable<any> {
		return this.http.get(`${BASE_URL}`)
	}

	uploadResume(file: Object) {
		this.http.post(`${BASE_URL}/api/aws/upload`, file, {withCredentials:true})
			.subscribe(
				(v: any) => {
				console.log(v);
				this.successMessage.next(true);
			},
				(err: HttpErrorResponse) => {
					console.log(err);
					this.failedMessage.next(true);
				}		
			)
	}

	getSuccessMsg(): Observable<any> {
		return this.successMessage;
	}

	closeMsg() {
		this.successMessage.next(false)
		this.failedMessage.next(false)
	}

	getFailedMsg(): Observable<any> {
		return this.failedMessage;
	}
}
