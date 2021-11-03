import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColModel, PaginatorModel } from '@models/core';
import { ApplicationModel, DependenceModel } from '@models/license-work';
import { MessageService } from '@services/core';
import { BreadcrumbService } from '@services/core/breadcrumb.service';
import { LicenseWorkHttpService } from '@services/license-work';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dependence-list',
  templateUrl: './dependence-list.component.html',
  styleUrls: ['./dependence-list.component.scss']
})
export class DependenceListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  filter: FormControl;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  progressBarDelete: boolean = false;

  dependences: DependenceModel[] = [];
  selectedDependence: DependenceModel = {};
  selectedDependences: DependenceModel[] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService
  ) 
  {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Dependencia', disabled: true},
    ]);

    this.filter = new FormControl(null);
  }

  ngOnInit(): void {
    this.setCols();
    this.setItems();
    this.loadDependences();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadDependences() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getDependences(this.paginator, this.filter.value)
        .subscribe(
        response => {
          this.loading = false;
          this.dependences = response.data;
          this.paginator = response.meta;
        }, error => {
          this.loading = false;
          this.messageService.error(error);
        }
      ));
  }

  filterDependences(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadDependences();
    }
  }

  editDependence(dependence: ApplicationModel) {
    this.router.navigate(['/license-work/dependence/', dependence.id]);
  }

  createDependence() {
    this.router.navigate(['/license-work/dependence/', 'new']);
  }

  selectDependence(dependence: DependenceModel) {
    this.selectedDependence = dependence;
  }

  deleteDependence(dependence: DependenceModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteDependence(dependence.id!).subscribe(
            response => {
              this.removeDependence(dependence);
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
  deleteDependences(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedDependences.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteDependences(ids).subscribe(
            response => {
              this.removeDependences(ids!);
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

  removeDependence(dependence: DependenceModel) {
    this.dependences = this.dependences.filter(element => element.id !== dependence.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeDependences(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.dependences = this.dependences.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedDependences = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadDependences();
  }

  setCols() {
    this.cols = [
      {field: 'id', header: 'Identificador'},
      {field: 'name', header: 'Nombre'},
      {field: 'level', header: 'Nivel'},
    ];
  }

  setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editDependence(this.selectedDependence);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteDependence(this.selectedDependence);
        }
      }
    ];
  }

}