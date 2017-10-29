import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  profile: any;
  setupStep = new Subject();
  user = new Subject();

  login(login_cred: Object){
  	this.http.post('http://localhost:8080/applicant/signin', login_cred)
  	.subscribe(
  		(data: any) => {
        this.user.next(data);
      },
  		(err: HttpErrorResponse) => {
        if (err["statusCode"] == "400"){
          alert(err["message"])
        }
      }
  	)
  }

  register(registration_cred: Object){
  	this.http.post('http://localhost:8080/applicant/register', registration_cred)
  	.subscribe(
  		(data: any) => {
        this.user.next(data);
        this.router.navigate(['setup']);
      },
  		(err: HttpErrorResponse) => {
        console.log(err);
        if (err["statusCode"] == "400"){
          alert(err["message"])
        }
      }
  	)
  }

  getName(): Observable<any> {
    return this.user;
  }

  logout() {
    return this.http.post('/applicant/register', {})
  }

  getSession(){
    console.log("this function is being called")
    this.http.get('http://localhost:8080/applicant/activeSession')
      .subscribe(data => alert(JSON.stringify(data)))
  }

  getProfile(user: String) {
    this.http.get("/profile/" + user)
    .subscribe(
      data => this.profile = data
    )
  }

	sendProfileInfo(data: Object) {
		let num = Number(localStorage.getItem('setupStep')) + 1;
		localStorage.setItem('setupStep', num.toString());
		this.setupStep.next(num);
		const stor = localStorage.getItem('profile') || '';
		const obj = stor !== '' ? JSON.parse(stor) : {};
		const updatedObj = Object.assign(obj, data);
		localStorage.setItem('profile', JSON.stringify(updatedObj));
    if (num == 3){
      return this.register(updatedObj)
    }
	}

	getSetupStep(): Observable<any> {
		return this.setupStep;
	}
}
