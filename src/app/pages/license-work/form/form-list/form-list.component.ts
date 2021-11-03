import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {LicenseWorkHttpService} from '@services/license-work';
import {MessageService} from '@services/core';
import {FormModel,} from '@models/license-work';
import {ColModel, PaginatorModel} from '@models/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    cols: ColModel[] = [];
    items: MenuItem[] = [];
    loading: boolean = false;
    paginator: PaginatorModel = {current_page: 1, per_page: 5, total: 0};
    filter: FormControl;
    progressBarDelete: boolean = false;
    forms: FormModel[] = [];
    selectedForm: FormModel = {};
    selectedForms: FormModel[] = [];
  
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
        {label: 'Empleador', routerLink: ['/license-work/employer']},
        {label: 'Aplicacion', routerLink: ['/license-work/application']},
        {label: 'Formulario', disabled: true},
        {label: 'Vacaciones', routerLink: ['/license-work/holiday']},
        {label: 'Razones', routerLink: ['/license-work/reason']},
        {label: 'Estado', routerLink: ['/license-work/state']},
      ]);
      this.filter = new FormControl(null);
    }
  
    ngOnInit(): void {
      this.setCols();
      this.setItems();
      this.loadForms();
    }
  
    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  
    loadForms() {
      this.loading = true;
      this.subscriptions.push(
        this.licenseWorkHttpService.getForms(this.paginator, this.filter.value).subscribe(
          response => {
            this.loading = false;
            this.forms = response.data;
            this.paginator = response.meta;
          }, error => {
            this.loading = false;
            this.messageService.error(error);
          }
        ));
    }
  
    filterForms(event: any) {
      if (event.key === 'Enter' || event.type === 'click') {
        this.loadForms();
      }
    }
  
    editForm(form: FormModel) {
      this.router.navigate(['/license-work/form/', form.id]);
    }
  
    createForm() {
      this.router.navigate(['/license-work/form/', 'new']);
    }
  
    selectForm(form: FormModel) {
      this.selectedForm = form;
    }
  
    deleteForm(form: FormModel): void {
      this.messageService.questionDelete({})
        .then((result) => {
          if (result.isConfirmed) {
            this.progressBarDelete = true;
            this.subscriptions.push(this.licenseWorkHttpService.deleteForm(form.id!)
            .subscribe(
              response => {
                this.removeForm(form);
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
  
    deleteForms(): void {
      this.messageService.questionDelete({})
        .then((result) => {
          if (result.isConfirmed) {
            this.progressBarDelete = true;
            const ids = this.selectedForms.map(element => element.id);
            this.subscriptions.push(this.licenseWorkHttpService.deleteForms(ids)
            .subscribe(
              response => {
                this.removeForms(ids!);
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
  
    removeForm(form: FormModel) {
      this.forms = this.forms.filter(element => element.id !== form.id);
      this.paginator.total = this.paginator.total - 1;
    }
  
    removeForms(ids: (number | undefined)[]) {
      for (const id of ids) {
        this.forms = this.forms.filter(element => element.id !== id);
        this.paginator.total = this.paginator.total - 1;
      }
      this.selectedForms = [];
    }
  
    paginate(event: any) {
      this.paginator.current_page = event.page + 1;
      this.loadForms();
    }
  
    setCols() {
      this.cols = [
        {field: 'code', header: 'Código del formulario'},
        {field: 'description', header: 'Formulario de Licencias y Permisos '},
        {field: 'regime', header: 'Losep.Codigo de trabajo'},
        {field: 'daysConst', header: '1.363636'},
        {field: 'approvedLevel', header: 'Nivel de aprobación que debe tener el formulario 1 2 3 4 etc'},
        {field: 'state', header: 'Estado del formulario true activo false inactivo'},
      ];
  
    }
  
    setItems() {
      this.items = [
        {
          label: 'Modificar', icon: 'pi pi-pencil', command: () => {
            this.editForm(this.selectedForm);
          }
        },
        {
          label: 'Eliminar', icon: 'pi pi-trash', command: () => {
            this.deleteForm(this.selectedForm);
          }
        }
      ];
    }
  }