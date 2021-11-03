import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MessageService} from '@services/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  primeIcons = PrimeIcons;
  progressBar: boolean = false;
  progressBarRequestPasswordReset: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authHttpService: AuthHttpService,
              public messageService: MessageService,
              private authService: AuthService,
              private router: Router) {
    this.formLogin = this.newFormLogin();
  }

  ngOnInit(): void {

  }

  newFormLogin(): FormGroup {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      deviceName: ['MiPC', [Validators.required]],
    });
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.login();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  login() {
    this.progressBar = true;
    this.authHttpService.login(this.formLogin.value)
      .subscribe(
        response => {
          console.log(response);
          this.messageService.success(response);
          this.progressBar = false;
          this.redirect();
        }, error => {
          this.messageService.error(error);
          this.progressBar = false;
        });
  }

  requestPasswordReset() {
    if (this.usernameField.valid) {
      this.progressBarRequestPasswordReset = true;
      this.authHttpService.requestPasswordReset(this.usernameField.value)
        .subscribe(
          response => {
            this.messageService.success(response);
            this.progressBarRequestPasswordReset = false;
          }, error => {
            this.messageService.error(error);
            this.progressBarRequestPasswordReset = false;
          });
    } else {
      this.usernameField.markAsTouched();
    }
  }

  requestUserUnlock() {
    this.progressBar = true;
    this.authHttpService.login(this.usernameField.value)
      .subscribe(
        response => {
          this.messageService.success(response);
          this.progressBar = false;
          this.redirect();
        }, error => {
          this.messageService.error(error);
          this.progressBar = false;
        });
  }

  redirect() {
    this.router.navigate(['/license-work/dependence']);
  }

  redirectRegistration() {
    this.router.navigate(['/registration/professional']);
  }

  get usernameField() {
    return this.formLogin.controls['username'];
  }

  get passwordField() {
    return this.formLogin.controls['password'];
  }

  get deviceNameField() {
    return this.formLogin.controls['deviceName'];
  }

}
