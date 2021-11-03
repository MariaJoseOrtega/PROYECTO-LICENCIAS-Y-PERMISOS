import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ColModel, PaginatorModel} from "@models/core";
import {MenuItem} from "primeng/api";
import {FormControl} from "@angular/forms";
import {StateModel} from "@models/license-work";
import {Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {


  private subscriptions: Subscription[] = [];
  cols: ColModel[] = [];
  items: MenuItem[] = [];
  loading: boolean = false;
  filter: FormControl;
  paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
  progressBarDelete: boolean = false;

  states: StateModel[] = [];
  selectedState: StateModel = {};
  selectedStates: StateModel [] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Estado', disabled: true},
    ]);
    this.filter = new FormControl(null);
  }

  ngOnInit(): void {
    this.setCols();
    this.setItems();
    this.loadStates();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadStates() {
    this.loading = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.getStates(this.paginator, this.filter.value)
        .subscribe(
          response => {
            this.loading = false;
            this.states = response.data;
            this.paginator = response.meta;
          }, error => {
            this.loading = false;
            this.messageService.error(error);
          }
        ));
  }

  filterStates(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadStates();
    }
  }

  editState(state: StateModel) {
    this.router.navigate(['/license-work/state/', state.id]);
  }

  createState() {
    this.router.navigate(['/license-work/state/', 'new']);
  }

  selectState(state: StateModel) {
    this.selectedState = state;
  }

  deleteState(state: StateModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          this.subscriptions.push(this.licenseWorkHttpService.deleteState(state.id!)
            .subscribe(
              response => {
                this.removeState(state);
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
  deleteStates(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.progressBarDelete = true;
          const ids = this.selectedStates.map(element => element.id);
          this.subscriptions.push(this.licenseWorkHttpService.deleteStates(ids).subscribe(
            response => {
              this.removeStates(ids!);
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

  removeState(state: StateModel) {
    this.states = this.states.filter(element => element.id !== state.id);
    this.paginator.total = this.paginator.total - 1;
  }

  removeStates(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.states = this.states.filter(element => element.id !== id);
      this.paginator.total = this.paginator.total - 1;
    }
    this.selectedStates = [];
  }

  paginate(event: any) {
    this.paginator.current_page = event.page + 1;
    this.loadStates();
  }

  setCols() {
    this.cols = [
      {field: 'name', header: 'Nombre del estado'},
      {field: 'code', header: 'codigo'},
    ];
  }

  setItems() {
    this.items = [
      {
        label: 'Modificar', icon: 'pi pi-pencil', command: () => {
          this.editState(this.selectedState);
        }
      },
      {
        label: 'Eliminar', icon: 'pi pi-trash', command: () => {
          this.deleteState(this.selectedState);
        }
      }
    ];
  }
}
