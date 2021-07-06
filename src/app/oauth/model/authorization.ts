import { AuthorizationResponse } from './authorization-response';

export class Authorization {

  public accessToken: string;
  public refreshToken: string;
  public expiresIn: number;

  constructor(authorizationResponse: AuthorizationResponse) {
    this.accessToken = authorizationResponse.accessToken;
    this.refreshToken = authorizationResponse.refreshToken;
    this.expiresIn = new Date().getTime() + (1000 * authorizationResponse.expiresIn);
  }

}
