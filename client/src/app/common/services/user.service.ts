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

	login(login_cred: object, setupProfile: boolean){
		const url = `${BASE_URL}/applicant/signin`;
		this.http.post(url, login_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					console.log(data);
					if (data.statusCode == '200') {
						this.setStorage(data.applicant);
						setupProfile ? this.router.navigate(['setup']) :
						this.router.navigate(['applicant'])
					}
				},
				(err: HttpErrorResponse) => {
					if (err.status === 400) {
						console.log(err.message)
					}
				}
			)
	}

	updateProfile(update_cred: object){
		const url = `${BASE_URL}/applicant/update`;
		this.http.post(url, update_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					if (data["statusCode"] == 200){
						this.setStorage(data.applicant);
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

	setStorage(data: any) {
		delete data.password;
		localStorage.setItem('user', JSON.stringify(data));		
	}

	register(registration_cred: any) {
		const url = `${BASE_URL}/applicant/register`;
		this.http.post(url, registration_cred, {withCredentials: true})
			.subscribe(
				(data: any) => {
					if (data.statusCode == '200') {
						const obj = {email: registration_cred.email, password: registration_cred.password};
						console.log(this);
						this.login(obj, true);
					} else {
						console.log(data);
					}
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
				(err: HttpErrorResponse) => console.log(err))
	}

	getProfile(email: String) {
		const url = `${BASE_URL}/applicant/profile?email=${email}`;
		this.http.get(url, {withCredentials: true})
			.subscribe(
				// (data: any) => this.profile = data,
				(data: any) => console.log(data),
				(err: HttpErrorResponse) => console.log(err)
			)
	}

	/* applicant setup process is 3 consecutive forms. method will combine the values of the 3 forms into 
	 a single object using localStorage. method also keeps track of current form - will be either 1, 2, or 3
	*/
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
		return this.http.get(`${BASE_URL}/applicant/appliedJobs`, {withCredentials: true})
	}

	uploadResume(file: Object) {
		this.http.post(`${BASE_URL}/api/aws/s3/upload`, file, {withCredentials:true})
			.subscribe(
				(v: any) => {
					if (v.statusCode == '200') {
						console.log(v);
						this.successMessage.next(true);
					}
				},
				(err: HttpErrorResponse) => {
					console.log(err);
					this.failedMessage.next(true);
				}		
			)
	}
}
