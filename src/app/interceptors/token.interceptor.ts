import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigStorageService} from "../providers/config-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private configStorageService: ConfigStorageService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('session'));
        console.log(currentUser);
        if (currentUser && currentUser.token) {
            console.log("Appended token to request");
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${currentUser.token}`
                }
            });
        } else {
            console.log("Skipping clone due to lack of token")
        }

        return next.handle(request);
    }
}