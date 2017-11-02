import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
    from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest = req.clone({
            responseType: 'text'
        });

        return next.handle(clonedRequest)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event.clone({
                        body: JSON.parse(event.body),
                    });
                }
            })
            .catch((error: HttpErrorResponse) => {
                console.log(error);
                let parsedError;
                try {
                    parsedError = Object.assign({}, error, { error: JSON.parse(error.error) });
                    
                } catch (error) {
                    console.log(error);
                }
                return Observable.throw(new HttpErrorResponse(parsedError));
            });
    }
}
