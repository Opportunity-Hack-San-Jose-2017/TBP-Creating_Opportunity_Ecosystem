import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }

  getCompanyProfile(){
  	return this.http.get('/company/profile')
  }

  register(data: Object){
  	return this.http.post('/company/register', data)
  }

  login(data: Object){
  	return this.http.post('/company/signon', data)
  }

  logout(){
  	var data = {}
  	return this.http.post('/company/logout', data)
  }
}
