import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpInterceptorProviders} from './interceptors';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
// PrimeNg Modules
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {RippleModule} from 'primeng/ripple';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import {TableModule} from 'primeng/table';

// Components
import {AppComponent} from './app.component';
import {
  FooterComponent,
  TopbarComponent,
  SidebarComponent,
  BlankComponent,
  MainComponent,
  BreadcrumbComponent
} from '@layout/index';
import {PanelMenuModule} from 'primeng/panelmenu';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    MainComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        AvatarModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        DropdownModule,
        InputSwitchModule,
        InputTextModule,
        TableModule,
        SidebarModule,
        RippleModule,
        MenubarModule,
        PanelMenuModule,
        SharedModule,
        BreadcrumbModule,
        ProgressSpinnerModule,
    ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
