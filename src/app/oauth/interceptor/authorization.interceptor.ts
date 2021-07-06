import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../service/authorization.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  public intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    if (!httpRequest.withCredentials) {
      if (this.isNullOrEmpty(httpRequest.headers.get('Content-Type'))) {
        httpRequest = httpRequest.clone({
          headers:
            httpRequest.headers.set('Content-Type', 'application/json'),
        });
      }
      return httpHandler.handle(httpRequest);
    }

    const authorizationService: AuthorizationService = this.injector.get(AuthorizationService);

    httpRequest = httpRequest.clone({
      headers:
        httpRequest.headers.set('Authorization', `Bearer ${authorizationService.getAuthorization().accessToken}`)
    });

    httpRequest = httpRequest.clone({
      headers:
        httpRequest.headers.set('Content-Type', 'application/json'),
      withCredentials: false
    });

    return httpHandler.handle(httpRequest);
  }

  private isNullOrEmpty(value: string): boolean {
    return (!value || value === undefined || value === '' || value.length === 0);
  }

}
