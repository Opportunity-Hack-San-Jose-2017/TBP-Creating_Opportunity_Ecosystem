import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(login_cred){
  	return this.http.post('/applicant/signin', login_cred)
  	.subscribe(data => console.log(data))
  }

  register(registration_cred){
  	return this.http.post('/applicant/register', registration_cred)
  	.subscribe(data => console.log(data))
  }

}
