import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorizationService } from '../oauth/service/authorization.service';

@Component({
  selector: 'car-auction-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private router: Router,
    private authorizationService: AuthorizationService) {
  }

  public logout(): void {
    this.authorizationService.removeAuthorization();
    this.router.navigate(['login']);
  }

}
