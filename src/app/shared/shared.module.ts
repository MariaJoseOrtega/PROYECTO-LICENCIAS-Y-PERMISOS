import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesPermissionsDirective} from '@shared/directives/roles-permissions.directive';
import {ErrorMessageDirective} from '@shared/directives/error-message.directive';
import {TokenDirective} from '@shared/directives/token.directive';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {LabelDirective} from './directives/label.directive';
import {CertificatedPipe} from './pipes/professional/academic-formation/certificated.pipe';
import {WorkedPipe} from './pipes/professional/experience/worked.pipe';
import {ProgressBarModule} from "primeng/progressbar";
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SkeletonComponent} from '@shared/components/skeleton/skeleton.component';
import {ViewFilesComponent} from '@shared/components/file/view-files/view-files.component';
import {UploadFilesComponent} from '@shared/components/file/upload-files/upload-files.component';
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {ExtensionsPipe} from "@shared/pipes/common/extensions.pipe";
import {FileUploadModule} from "primeng/fileupload";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import { DiscountableHolidayPipe } from './pipes/license-work/reason/discountable-holiday.pipe';
import { StatePipe } from './pipes/license-work/form/state.pipe';

@NgModule({
  declarations: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    ViewFilesComponent,
    UploadFilesComponent,
    CertificatedPipe,
    WorkedPipe,
    ExtensionsPipe,
    DiscountableHolidayPipe,
    StatePipe,
  ],
  exports: [
    RolesPermissionsDirective,
    ErrorMessageDirective,
    TokenDirective,
    LabelDirective,
    SkeletonComponent,
    ProgressBarComponent,
    CertificatedPipe,
    WorkedPipe,
    ExtensionsPipe,
    UploadFilesComponent,
    ViewFilesComponent,
    DiscountableHolidayPipe,
    StatePipe,
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TooltipModule,
    FileUploadModule,
    MessageModule,
    InputTextareaModule,
    DividerModule,
    CardModule
  ]
})
export class SharedModule {
}
