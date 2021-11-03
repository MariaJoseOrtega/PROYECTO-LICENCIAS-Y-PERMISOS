import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {LicenseWorkHttpService} from '@services/license-work';
import {MessageService} from '@services/core';
import {HolidayModel,} from '@models/license-work';
import {ColModel, PaginatorModel} from '@models/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    cols: ColModel[] = [];
    items: MenuItem[] = [];
    loading: boolean = false;
    paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
    filter: FormControl;
    progressBarDelete: boolean = false;
    holidays: HolidayModel[] = [];
    selectedHoliday: HolidayModel = {};
    selectedHolidays: HolidayModel[] = [];
  
    constructor(private router: Router,
                private breadcrumbService: BreadcrumbService,
                public messageService: MessageService,
                private licenseWorkHttpService: LicenseWorkHttpService
                ) 
    {
      this.breadcrumbService.setItems([
        {label: 'Home', disabled: true},
        {label: 'Aplicacion', routerLink: ['/license-work/application']},
        {label: 'Dependencia', routerLink: ['/license-work/dependence']},
        {label: 'Employee', routerLink: ['/license-work/employee']},
        {label: 'Empleador', routerLink: ['/license-work/employer']},
        {label: 'Formulario', routerLink: ['/license-work/form']},
        {label: 'Vacaciones', disabled: true},
        {label: 'Razones', routerLink: ['/license-work/reason']},
        {label: 'Estado', routerLink: ['/license-work/state']},
      ]);
  
      this.filter = new FormControl(null);
    }
  
    ngOnInit(): void {
      this.setCols();
      this.setItems();
      this.loadHolidays();
    }
  
    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  
    loadHolidays() {
      this.loading = true;
      this.subscriptions.push(
        this.licenseWorkHttpService.getHolidays(this.paginator, this.filter.value).subscribe(
          response => {
            this.loading = false;
            this.holidays = response.data;
            this.paginator = response.meta;
          }, error => {
            this.loading = false;
            this.messageService.error(error);
          }
        ));
    }
  
    filterHolidays(event: any) {
      if (event.key === 'Enter' || event.type === 'click') {
        this.loadHolidays();
      }
    }
  
    editHoliday(holiday: HolidayModel) {
      this.router.navigate(['/license-work/holiday/', holiday.id]);
    }
  
    createHoliday() {
      this.router.navigate(['/license-work/holiday/', 'new']);
    }
  
    selectHoliday(holiday: HolidayModel) {
      this.selectedHoliday = holiday;
    }
  
    deleteHoliday(holiday: HolidayModel): void {
      this.messageService.questionDelete({})
        .then((result) => {
          if (result.isConfirmed) {
            this.progressBarDelete = true;
            this.subscriptions.push(this.licenseWorkHttpService.deleteHoliday(holiday.id!)
            .subscribe(
              response => {
                this.removeHoliday(holiday);
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
  
    deleteHolidays(): void {
      this.messageService.questionDelete({})
        .then((result) => {
          if (result.isConfirmed) {
            this.progressBarDelete = true;
            const ids = this.selectedHolidays.map(element => element.id);
            this.subscriptions.push(this.licenseWorkHttpService.deleteHolidays(ids)
            .subscribe(
              response => {
                this.removeHolidays(ids!);
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
  
    removeHoliday(holiday: HolidayModel) {
      this.holidays = this.holidays.filter(element => element.id !== holiday.id);
      this.paginator.total = this.paginator.total - 1;
    }
  
    removeHolidays(ids: (number | undefined)[]) {
      for (const id of ids) {
        this.holidays = this.holidays.filter(element => element.id !== id);
        this.paginator.total = this.paginator.total - 1;
      }
      this.selectedHolidays = [];
    }
  
    paginate(event: any) {
      this.paginator.current_page = event.page + 1;
      this.loadHolidays();
    }
  
    setCols() {
      this.cols = [
        {field: 'employee', header: 'Nombre del trabajador Losep.Cod.'},
        {field: 'numberDays', header: 'Número de dás de licencias y permisos '},
        {field: 'year', header: 'Año de vacaciones'},
        
      ];
  
    }
  
    setItems() {
      this.items = [
        {
          label: 'Modificar', icon: 'pi pi-pencil', command: () => {
            this.editHoliday(this.selectedHoliday);
          }
        },
        {
          label: 'Eliminar', icon: 'pi pi-trash', command: () => {
            this.deleteHoliday(this.selectedHoliday);
          }
        }
      ];
    }
  }
  
