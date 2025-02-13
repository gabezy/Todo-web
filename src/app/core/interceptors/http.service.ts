import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

export const contentTypeInterceptor =
  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>  {
    const INTERCEPT_METHOD = ['POST', 'PUT'];

    if (INTERCEPT_METHOD.includes(req.method)) {
      const clonedRequest = req.clone({
        setHeaders: { 'Content-Type': 'application/json' }
      });

      return next(clonedRequest);
    }

    return next(req);
}

export const authInterceptor =
  (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const PUBLIC_URL = ['/auth', '/users'];
    const authService = inject(AuthService);
    const router = inject(Router);

    const isUrlPublic = req.method == 'POST' && PUBLIC_URL.some(url => req.url.includes(url));

    if (isUrlPublic) {
      return next(req);
    }

    const token = authService.getToken();

    const modifiedRequest = token
      ? req.clone({setHeaders: {'Authorization' : `Bearer ${token}`}})
      : req;

    return next(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
}
