import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '@web/core/services/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * The custom interceptor for handling HTTP errors, mainly for creating `SnackBar` notifications.
 */
@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private notificationService: NotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => this.handleHttpError(err)));
    }

    private handleHttpError(error: HttpErrorResponse): Observable<any> {
        switch(error.status) {
            case 400:
            case 404:
                this.notificationService.createNotification(error.error.message);
                break;
            case 429:
                this.notificationService.createNotification(
                    'Oops, you are not supposed to see this error. Please email me if you read this - I would really appreciate it!',
                    'Email',
                    4200
                );
                break;
            default:
                this.notificationService.createNotification(error.message);
                break;
        }

        return throwError(error);
    }
}
