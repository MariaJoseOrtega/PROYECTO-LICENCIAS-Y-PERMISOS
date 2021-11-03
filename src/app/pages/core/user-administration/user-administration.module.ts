import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAdministrationListComponent} from './user-administration-list/user-administration-list.component';
import {UserAdministrationFormComponent} from './user-administration-form/user-administration-form.component';
import {UserAdministrationComponent} from './user-administration.component';
import {UserAdministrationRoutingModule} from './user-administration-routing.module';
import {TableModule} from 'primeng/table';
import {SpeedDialModule} from 'primeng/speeddial';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    UserAdministrationComponent,
    UserAdministrationListComponent,
    UserAdministrationFormComponent,
  ],
  imports: [
    CommonModule,
    UserAdministrationRoutingModule,
    SharedModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ProgressBarModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
  ]
})
export class UserAdministrationModule {
}
