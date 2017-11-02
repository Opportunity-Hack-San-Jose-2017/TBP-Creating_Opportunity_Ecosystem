import { Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { url as BASE_URL } from '../config/url';

@Injectable()
export class UploadService {

	successMessage = new BehaviorSubject(false);
	failedMessage = new BehaviorSubject(false);

	constructor(private _http: HttpClient) { }

	sendFile(file: any) {
		let formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', `${BASE_URL}/api/aws/s3/upload`, formdata, {
			withCredentials: true
		});
		this._http.request(req)
			.subscribe(
				(v: any) => {
					if (v.type === HttpEventType.UploadProgress) {
						console.log(v.total, v.loaded);
					}
					this.successMessage.next(true);
				},
				(err: HttpErrorResponse) => {
					console.log(err);
					this.failedMessage.next(true);
				}
			)
	}

	getFiles(): Observable<any> {
		return this._http.get('/getallfiles')
	}

	getSuccessMsg(): Observable<any> {
		return this.successMessage;
	}

	closeMsg() {
		this.successMessage.next(false)
		this.failedMessage.next(false)
	}

	getFailedMsg(): Observable<any> {
		return this.failedMessage;
	}

}
