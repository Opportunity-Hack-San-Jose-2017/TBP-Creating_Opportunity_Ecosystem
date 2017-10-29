import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  user: any;
  profile: any;
  setupStep = new Subject();

  login(login_cred: Object){
  	this.http.post('http://localhost:8080/applicant/signin', login_cred)
  	.subscribe(
  		data => {
        this.user = data
        if (data["statusCode"] == "400"){
          alert(data["message"])
        } else if (data["statusCode"] == "200") {
          
        }
      },
  		error => console.log(error)
  		)
  }

  register(registration_cred: Object){
  	this.http.post('http://localhost:8080/applicant/register', registration_cred)
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
    this.http.get('http://localhost:8080/applicant/activeSession')
    .subscribe(data => console.log(data))
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
