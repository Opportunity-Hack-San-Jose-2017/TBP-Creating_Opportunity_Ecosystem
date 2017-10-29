import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  user: any;
  profile: any;
  setupStep = new Subject();

  login(login_cred: Object){
  	this.http.post('/applicant/signin', login_cred)
  	.subscribe(
  		data => this.user = data,
  		error => console.log(error)
  		)
  }

  register(registration_cred: Object){
  	this.http.post('/applicant/register', registration_cred)
  	.subscribe(
  		data => this.user = data,
  		error => console.log(error)
  		)
  }

  logout() {
    var data = {}
    return this.http.post('/applicant/register', data)
  }

  getSession(){
    return this.http.get('/applicant/activeSession')
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
	}

	getSetupStep() {
		return this.setupStep;
	}
}
