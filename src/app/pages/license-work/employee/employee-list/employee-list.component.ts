import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {LicenseWorkHttpService} from '@services/license-work';
import {MessageService} from '@services/core';
import {EmployeeModel} from '@models/license-work';
import {ColModel, PaginatorModel} from '@models/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  filter: FormControl;
  employees: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel = {};
  selectedEmployees: EmployeeModel[] = [];
  progressBarDelete: boolean = false;

  constructor(private router: Router,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
    )

     {
      this.breadcrumbService.setItems([
       {label: 'Dashboard', routerLink: ['/dashboard']},
       {label: 'Empleados', disabled: true},
     ]);

     this.filter = new FormControl('');
   }

   ngOnInit(): void {
     this.setCols();
     this.setItems();
     this.loadEmployees();
   }

   ngOnDestroy(): void {
     this.subscriptions.forEach(subscription => subscription.unsubscribe());
   }

   loadEmployees() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getEmployees(this.paginator, this.filter.value).subscribe(
        response => {
          this.loading = false;
          this.employees= response.data;
          this.paginator = response.meta;
        }, error => {
          this.loading = false;
          this.messageService.error(error);
        }
      ));
  }


  filterEmployees(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadEmployees();
    }
  }

  editEmployee(employee: EmployeeModel) {
    this.router.navigate(['/license-work/employee/',employee.id]);
  }

  createEmployee() {
    this.router.navigate(['/license-work/employee/', 'new']);
  }

  selectEmployee(employee: EmployeeModel) {
    this.selectedEmployee = employee;
  }

  deleteEmployee(employee: EmployeeModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteEmployee(employee.id!).subscribe(
            response => {
              this.removeEmployee(employee);
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

  deleteEmployees(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedEmployees.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteEmployees(ids).subscribe(
            response => {
              this.removeEmployees(ids!);
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

  removeEmployee(employee: EmployeeModel) {
    this.employees = this.employees.filter(element => element.id !== employee.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeEmployees(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.employees = this.employees.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedEmployees = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadEmployees();
  }

  setCols() {
    this.cols = [
      {field: 'user', header: 'Usuario'},

    ];

  }


  setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editEmployee(this.selectedEmployee);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteEmployee(this.selectedEmployee);
        }
      }
    ];
  }











}
