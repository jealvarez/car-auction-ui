import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router,
    private authorizationService: AuthorizationService) { }

  public canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) {
    const authenticated: boolean = this.authorizationService.isAuthenticated();
    if (!authenticated) {
      this.router.navigate(['/login']);
    }
    return authenticated;
  }

}
