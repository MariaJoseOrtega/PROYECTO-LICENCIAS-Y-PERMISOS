import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ColModel, PaginatorModel} from '@models/core';
import {ApplicationModel, ReasonModel} from '@models/license-work';
import {MessageService} from '@services/core';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {LicenseWorkHttpService} from '@services/license-work';
import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reason-list',
  templateUrl: './reason-list.component.html',
  styleUrls: ['./reason-list.component.scss']
})

export class ReasonListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  filter: FormControl;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  progressBarDelete: boolean = false;

  reasons: ReasonModel[] = [];
  selectedReason: ReasonModel = {};
  selectedReasons: ReasonModel[] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService
    ) 
    { 
      this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Razones', disabled: true},
    ]);

    this.filter = new FormControl(null);
  }

  ngOnInit(): void {
    this.setCols();
    this.setItems();
    this.loadReasons();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadReasons() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getReasons(this.paginator, this.filter.value)
      .subscribe(
        response => {
          this.loading = false;
          this.reasons = response.data;
          this.paginator = response.meta;
        }, error => {
          this.loading = false;
          this.messageService.error(error);
        }
      ));
  }

 filterReasons(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadReasons();
    }
  }

  editReason(reason: ApplicationModel) {
    this.router.navigate(['/license-work/reason/', reason.id]);// preguntar reason
  }

  createReason() {
    this.router.navigate(['/license-work/reason/', 'new']);
  }

  selectReason(reason: ReasonModel) {
    this.selectedReason = reason;
  }

  deleteReason(reason: ReasonModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteReason(reason.id!)
          .subscribe(
            response => {
              this.removeReason(reason);
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

  deleteReasons(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedReasons.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteReasons(ids).subscribe(
            response => {
              this.removeReasons(ids!);
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

  removeReason(reason: ReasonModel) {
    this.reasons = this.reasons.filter(element => element.id !== reason.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeReasons(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.reasons = this.reasons.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedReasons = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadReasons();
  }
 
  setCols() {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'descriptionOne', header: 'Descripción Uno '},
      {field: 'descriptionTwo', header: 'Descripción Dos'},
      {field: 'discountableHolidays', header: '¿Descontable a Vacaciones?'},
      {field: 'daysMin', header: 'Días mínimos'},
      {field: 'daysMax', header: 'Días maximos'},
    ];
 }

 setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editReason(this.selectedReason);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteReason(this.selectedReason);
        }
      }
    ];
  }

}



