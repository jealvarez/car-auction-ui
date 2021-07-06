import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Authentication } from './../model/authentication';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../oauth/service/authorization.service';

@Component({
  selector: 'car-auction-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public siginFormGroup: FormGroup;
  public errorMessage: string;
  public hasError = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.initializeSignInForm();
  }

  public login(): void {
    const authentication: Authentication = this.siginFormGroup.value;
    this.authorizationService.authenticate(authentication.username, authentication.password)
      .subscribe((authorization) => {
        if (authorization && authorization.accessToken) {
          this.authorizationService.storeAuthorization(authorization);
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }
      }, error => {
        this.hasError = true;
        this.errorMessage = error.error.error_description ? error.error.error_description : error.message;
      });
  }

  private initializeSignInForm(): void {
    this.siginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
