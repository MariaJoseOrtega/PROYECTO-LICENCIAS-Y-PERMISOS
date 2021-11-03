import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {ApplicationModel} from "@models/license-work";
import {Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  filter: FormControl;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  progressBarDelete: boolean = false;

  applications: ApplicationModel[] = [];
  selectedApplication: ApplicationModel = {};
  selectedApplications: ApplicationModel[] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Home', disabled: true},
      {label: 'Solicitud', disabled: true},
      {label: 'Dependencia', routerLink: ['/license-work/dependence']},
      {label: 'Employee', routerLink: ['/license-work/employee']},
      {label: 'Empleador', routerLink: ['/license-work/employer']},
      {label: 'Formulario', routerLink: ['/license-work/form']},
      {label: 'Vacaciones', routerLink: ['/license-work/holiday']},
      {label: 'Razones', routerLink: ['/license-work/reason']},
      {label: 'Estado', routerLink: ['/license-work/state']},
    ]);

    this.filter = new FormControl(null);
  }

  ngOnInit(): void {
    this.setCols();
    this.setItems();
    this.loadApplications();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadApplications() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getApplications(this.paginator, this.filter.value)
        .subscribe(
        response => {
          this.loading = false;
          this.applications = response.data;
          this.paginator = response.meta;
        }, error => {
          this.loading = false;
          this.messageService.error(error);
        }
      ));
  }

  filterApplications(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadApplications();
    }
  }

  editApplication(application: ApplicationModel) {
    this.router.navigate(['/license-work/application/', application.id]);
  }

  createApplication() {
    this.router.navigate(['/license-work/application/', 'new']);
  }

  selectApplication(application: ApplicationModel) {
    this.selectedApplication = application;
  }

  deleteApplication(application: ApplicationModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteApplication(application.id!)
            .subscribe(
            response => {
              this.removeApplication(application);
              this.messageService.success(response);
              this.progressBarDelete = false;
            },
            error => {
              this.messageService.error(error);
              this.progressBarDelete = false;
            }
          ));
        }
      });
  }
  deleteApplications(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedApplications.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteApplications(ids).subscribe(
            response => {
              this.removeApplications(ids!);
              this.messageService.success(response);
              this.progressBarDelete = false;
            },
            error => {
              this.messageService.error(error);
              this.progressBarDelete = false;
            }
          ));
        }
      });
  }

  removeApplication(application: ApplicationModel) {
    this.applications = this.applications.filter(element => element.id !== application.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeApplications(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.applications = this.applications.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedApplications = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadApplications();
  }

  setCols() {
    this.cols = [
      {field: 'employee', header: 'Empleado'},
      {field: 'reason', header: 'Razones'},
      {field: 'location', header: 'Localización'},
      {field: 'type', header: 'tipo'},
      {field: 'form', header: 'Formulario'},
      {field: 'dateStartedAt', header: 'Fecha de inicio de la Licencia o Permiso'},
      {field: 'dateEndedAt', header: 'Fecha final de la Licencia o Permiso'},
      {field: 'timeStartedAt', header: 'Hora de inicio de la Licencia o Permiso'},
      {field: 'timeEndedAt', header: 'Hora final de la Licencia o Permiso'},
      {field: 'observations', header: 'Listado de observaciones'},
    ];
  }

  setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editApplication(this.selectedApplication);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteApplication(this.selectedApplication);
        }
      }
    ];
  }

}
