import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  profile: any;
  setupStep = new Subject();
  name = new Subject();

  login(login_cred: Object){
  	this.http.post('http://localhost:8080/applicant/signin', login_cred)
  	.subscribe(
  		(data: any) => {
        this.name.next(data);
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
        this.name.next(data);
      },
  		(err: HttpErrorResponse) => {
        if (err["statusCode"] == "400"){
          alert(err["message"])
        }
      }
  	)
  }

  getName(): Observable<any> {
    return this.name;
  }

  logout() {
    return this.http.post('/applicant/register', {})
  }

  getSession(){
    console.log("this function is being called")
    this.http.get('http://localhost:8080/applicant/activeSession')
      .subscribe(data => alert(JSON.stringify(data)))
  }

  getProfile(name: String) {
    this.http.get("/profile/" + name)
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

	getSetupStep() {
		return this.setupStep;
	}
}
