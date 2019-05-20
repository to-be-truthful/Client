import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NavController} from "@ionic/angular";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(
        private navController: NavController
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.navController.navigateForward("app/logout");
                return;
            }

            const error = err.error.message.msg || err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
