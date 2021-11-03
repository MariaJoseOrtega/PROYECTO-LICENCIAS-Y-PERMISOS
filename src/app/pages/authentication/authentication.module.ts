import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from "primeng/card";
import {SharedModule} from "@shared/shared.module";
import {DividerModule} from "primeng/divider";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SharedModule,
    DividerModule,
    RippleModule,
    PasswordModule
  ]
})
export class AuthenticationModule { }
