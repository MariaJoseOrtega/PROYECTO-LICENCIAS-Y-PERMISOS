import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LicenseWorkRoutingModule} from './license-work-routing.module';
import {LicenseWorkComponent} from './license-work.component';
import {SharedModule} from '@shared/shared.module';
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {SplitButtonModule} from "primeng/splitbutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";
import {ProgressBarModule} from "primeng/progressbar";
import {TooltipModule} from "primeng/tooltip";
import {CalendarModule} from "primeng/calendar";
import {InputSwitchModule} from "primeng/inputswitch";
import { ApplicationComponent } from './application/application.component';
import { ApplicationFormComponent } from './application/application-form/application-form.component';
import { ApplicationListComponent } from './application/application-list/application-list.component';
import { ReasonComponent } from './reason/reason.component';
import { ReasonFormComponent } from './reason/reason-form/reason-form.component';
import { ReasonListComponent } from './reason/reason-list/reason-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import {EmployerComponent} from "./employer/employer.component";
import {EmployerFormComponent} from "./employer/employer-form/employer-form.component";
import {EmployerListComponent} from "./employer/employer-list/employer-list.component";
import {HolidayComponent} from "./holiday/holiday.component";
import {HolidayFormComponent} from "./holiday/holiday-form/holiday-form.component";
import {HolidayListComponent} from "./holiday/holiday-list/holiday-list.component";
import {FormComponent} from "./form/form.component";
import {FormFormComponent} from "./form/form-form/form-form.component";
import {FormListComponent} from "./form/form-list/form-list.component";
import { StateComponent } from './state/state.component';
import { StateFormComponent } from './state/state-form/state-form.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { DependenceComponent } from './dependence/dependence.component';
import { DependenceFormComponent } from './dependence/dependence-form/dependence-form.component';
import { DependenceListComponent } from './dependence/dependence-list/dependence-list.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationFormComponent,
    ApplicationListComponent,
    ReasonComponent,
    ReasonFormComponent,
    ReasonListComponent,
    EmployerComponent,
    EmployerFormComponent,
    EmployerListComponent,
    HolidayComponent,
    HolidayFormComponent,
    HolidayListComponent,
    FormComponent,
    FormFormComponent,
    FormListComponent,
    StateComponent,
    StateFormComponent,
    StateListComponent,
    LicenseWorkComponent,
    DependenceComponent,
    DependenceFormComponent,
    DependenceListComponent
  ],
  imports: [
    CommonModule,
    LicenseWorkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Modules PrimeNg
    ToolbarModule,
    CardModule,
    PaginatorModule,
    TableModule,
    SplitButtonModule,
    InputTextModule,
    KeyFilterModule,
    RippleModule,
    DividerModule,
    ProgressBarModule,
    TooltipModule,
    CalendarModule,
    InputSwitchModule
  ]
})
export class LicenseWorkModule {
}
