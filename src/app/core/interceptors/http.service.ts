import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


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
