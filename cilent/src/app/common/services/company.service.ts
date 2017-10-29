import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, private _router: Router) { }

  getCompanyProfile(){
  	return this.http.get('http://localhost/company/profile')
  }

  register(data: Object){
  	this.http.post('http://localhost:8080/company/register', data)
    .subscribe(data => {
      this._router.navigate(['/company/opening/create'])
    }, error => {
      console.log(error)
    })
  }

  login(data: Object){
  	this.http.post('http://localhost:8080/company/signin', data)
    .subscribe(data => {
      console.log(data),
      this._router.navigate(['/company/opening/create'])
    }, error => {
      console.log(error)
    })
  }

  logout(){
  	var data = {}
  	return this.http.post('/company/logout', data)
  }
}
