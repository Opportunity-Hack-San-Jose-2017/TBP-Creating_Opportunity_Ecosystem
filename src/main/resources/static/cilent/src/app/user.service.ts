import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(login_cred){
  	return this.http.post('/applicant/signin', login_cred)
  	.map( data => data.json())
  	.toPromise;
  }

  register(registration_cred){
  	return this.http.post('/applicant/register', registration_cred)
  	.map( data => data.json() )
  	.toPromise;
  }

}
