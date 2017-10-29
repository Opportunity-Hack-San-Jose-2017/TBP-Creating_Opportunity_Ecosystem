import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  user;
  profile;

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
}
