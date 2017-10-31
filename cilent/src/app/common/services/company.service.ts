import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, private _router: Router) { }

  getCompanyProfile(){
  	this.http.get('http://54.183.64.109/company/profile')
    .subscribe(data => console.log(data))
  }

  register(data: Object){

  	this.http.post('http://54.183.64.109/company/register', data)
    .subscribe(data => {
      this._router.navigate(['/company/opening/create'])
    }, error => {
      console.log(error)
    })
  }

  login(data: Object){
  	this.http.post('http://54.183.64.109/company/signin', data,{withCredentials: true })
    .subscribe(data => {
      this._router.navigate(['/company/opening/create']),
      console.log(data)
    }, error => {
      console.log(error)
    })
  }

  logout(){
  	var data = {}
  	return this.http.post('http://54.183.64.109/company/logout', data)
  }
}
