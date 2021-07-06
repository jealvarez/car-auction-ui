import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OAuthConfiguration } from '../configuration/oauth-configuration';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Authorization } from '../model/authorization';
import { AuthorizationResponse } from '../model/authorization-response';
import { AuthorizationRequest } from '../model/authorization-request';
import { ParameterTransformer } from '../../transformer/parameter-transformer';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthorizationService {

  private OAUTH_TOKEN_RESOURCE = `${environment.domain}/oauth/token`;

  constructor(private httpClient: HttpClient) { }

  public authenticate(username: string, password: string): Observable<Authorization> {
    const authorizationRequest: string = this.serializeAuthorizationRequest(this.prepareResourceOwnerCredentials(username, password));
    return this.httpClient.post(this.OAUTH_TOKEN_RESOURCE, authorizationRequest, { headers: this.getHttpHeaders() })
    .pipe(
      map(response => {
        const authorizationResponse: AuthorizationResponse =
          ParameterTransformer.transformSnakeCaseToCamelCase(response) as AuthorizationResponse;
        return new Authorization(authorizationResponse);
      }));
  }

  public storeAuthorization(authorization: Authorization): void {
    localStorage.setItem('authorization', JSON.stringify(authorization));
  }

  public removeAuthorization(): void {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    const authorization: Authorization = this.getAuthorization();
    if (authorization && authorization.accessToken && !this.isTokenExpired()) {
      return true;
    }

    return false;
  }

  public getAuthorization(): Authorization {
    const authorization: Authorization = JSON.parse(localStorage.getItem('authorization')) as Authorization;
    return authorization;
  }

  private isTokenExpired(): boolean {
    const authorization: Authorization = this.getAuthorization();
    const currentTime: number = new Date().getTime();
    const accessTokenExpired = authorization.expiresIn - currentTime;

    if (accessTokenExpired <= 0) {
      return true;
    }

    return false;
  }

  private prepareResourceOwnerCredentials(username: string, password: string): AuthorizationRequest {
    const authorizationRequest: AuthorizationRequest = new AuthorizationRequest();
    authorizationRequest.grantType = OAuthConfiguration.GRANT_TYPE_PASSWORD;
    authorizationRequest.cliendId = OAuthConfiguration.CLIENT_ID;
    authorizationRequest.clientSecret = OAuthConfiguration.CLIENT_SECRET;
    authorizationRequest.username = username;
    authorizationRequest.password = password;

    return authorizationRequest;
  }

  private getHttpHeaders(): HttpHeaders {
    const httpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(OAuthConfiguration.CLIENT_ID + ':' + OAuthConfiguration.CLIENT_SECRET))
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return httpHeaders;
  }

  private serializeAuthorizationRequest(authorizationRequest: AuthorizationRequest): string {
    const convertModel = ParameterTransformer.transformCamelCaseToSnakeCase(authorizationRequest);
    return ParameterTransformer.joinParameters(convertModel);
  }

}
