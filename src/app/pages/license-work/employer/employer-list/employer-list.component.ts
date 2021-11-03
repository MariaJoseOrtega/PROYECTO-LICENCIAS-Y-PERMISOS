import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {EmployerModel} from "@models/license-work";
import {Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.scss']
})

export class EmployerListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  filter: FormControl;
  progressBarDelete: boolean = false;
  employers: EmployerModel[] = [];
  selectedEmployer: EmployerModel = {};
  selectedEmployers: EmployerModel[] = [];

  constructor(private router: Router,
              private breadcrumbService: BreadcrumbService,
              public messageService: MessageService,
              private licenseWorkHttpService: LicenseWorkHttpService
              ) 
  {
    this.breadcrumbService.setItems([
      {label: 'Home', disabled: true},
      {label: 'Dependencia', routerLink: ['/license-work/dependence']},
      {label: 'Employee', routerLink: ['/license-work/employee']},
      {label: 'Empleador', disabled: true},
      {label: 'Aplicacion', routerLink: ['/license-work/application']},
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
    this.loadEmployers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadEmployers() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getEmployers(this.paginator, this.filter.value).subscribe(
        response => {
          this.loading = false;
          this.employers = response.data;
          this.paginator = response.meta;
        }, error => {
          this.loading = false;
          this.messageService.error(error);
        }
      ));
  }

  filterEmployers(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadEmployers();
    }
  }

  editEmployer(employer: EmployerModel) {
    this.router.navigate(['/license-work/employer/', employer.id]);
  }

  createEmployer() {
    this.router.navigate(['/license-work/employer/', 'new']);
  }

  selectEmployer(employer: EmployerModel) {
    this.selectedEmployer = employer;
  }

  deleteEmployer(employer: EmployerModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteEmployer(employer.id!)
          .subscribe(
            response => {
              this.removeEmployer(employer);
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

  deleteEmployers(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedEmployers.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteEmployers(ids)
          .subscribe(
            response => {
              this.removeEmployers(ids!);
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

  removeEmployer(employer: EmployerModel) {
    this.employers = this.employers.filter(element => element.id !== employer.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeEmployers(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.employers = this.employers.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedEmployers = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadEmployers();
  }

  setCols() {
    this.cols = [
      {field: 'logo', header: 'Logo de Senescyt'},
      {field: 'department', header: 'Departamento de la Senescyt '},
      {field: 'coordination', header: 'Sub.Fom. Técnica y Tecnológica'},
      {field: 'unit', header: 'Nombre del Instituto'},
      {field: 'approvalName', header: 'Nombre de la persona quien aprueba'},
      {field: 'registerName', header: 'Senescyt_Talento_Humano'},
    ];
    

  }

  setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editEmployer(this.selectedEmployer);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteEmployer(this.selectedEmployer);
        }
      }
    ];
  }
}
