import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  user;

  login(login_cred){
  	this.http.post('/applicant/signin', login_cred)
  	.subscribe(
  		data => this.user = data,
  		error => console.log(error)
  		)
  }

  register(registration_cred){
  	this.http.post('/applicant/register', registration_cred)
  	.subscribe(
  		data => this.user = data,
  		error => console.log(error)
  		)
  }
}
