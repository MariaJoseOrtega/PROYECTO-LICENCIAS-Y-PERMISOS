import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OnExitInterface} from '@shared/interfaces/on-exit.interface';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {MessageService} from '@services/core';
import {LicenseWorkHttpService, LicenseWorkService} from '@services/license-work';
import {FormModel, EmployerModel} from '@models/license-work';

@Component({
  selector: 'app-application-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.scss']
})

export class FormFormComponent implements OnInit, OnDestroy, OnExitInterface {
  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Formulario';
  buttonTitle: string = 'Crear Formulario';
  employers: EmployerModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
    private licenseWorkService: LicenseWorkService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Home', disabled: true},
      {label: 'Dependencia', routerLink: ['/license-work/dependence']},
      {label: 'Empleador', routerLink: ['/license-work/employer']},
      {label: 'Aplicacion', routerLink: ['/license-work/application']},
      {label: 'Formulario', routerLink: ['/license-work/form']},
      {label: 'Vacaciones', routerLink: ['/license-work/holiday']},
      {label: 'Razones', routerLink: ['/license-work/reason']},
      {label: 'Estado', routerLink: ['/license-work/state']},
    ]);
    this.form = this.newForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != 'new') {
      this.title = 'Actualizar Formulario';
      this.buttonTitle = 'Actualizar Formulario';
      this.loadForm();
    }
    this.loadEmployers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async onExit() {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit({})
        .then((result) => {
          return result.isConfirmed;
        });
    }
    return true;
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      employer: [null, [Validators.required]],
      code:[null],
      description:[null],
      regime:[null],
      daysConst:[null],
      approvedLevel:[null],
      state:[null,[Validators.required]],
    });
  }

  loadForm() {
    this.loadingSkeleton = true;
    this.subscriptions.push(
      this.licenseWorkHttpService
      .getForm(this.activatedRoute.snapshot.params.id)
        .subscribe(
          response => {
            this.form.patchValue(response.data);
            this.loadingSkeleton = false;
          }, error => {
            this.loadingSkeleton = false;
            this.messageService.error(error);
          }
        ));
  }

  loadEmployers() {
    this.subscriptions.push(
      this.licenseWorkHttpService.getCatalogueEmployers()
        .subscribe(
          response => {
            this.form= response.data;
          }, error => {
            this.messageService.error(error);
          }
        ));
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.idField.value) {
        this.update(this.form.value);
      } else {
        this.store(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  store(form: FormModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.storeForm(form)
        .subscribe(
          response => {
            this.messageService.success(response);
            this.form.reset();
            this.progressBar = false;
            this.returnList();
          },
          error => {
            this.messageService.error(error);
            this.progressBar = false;
          }
        ));
  }

  update(form: FormModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.updateForm(form.id!, form)
        .subscribe(
          response => {
            this.messageService.success(response);
            this.form.reset();
            this.progressBar = false;
            this.returnList();
          },
          error => {
            this.messageService.error(error);
            this.progressBar = false;
          }
        ));
  }

  isRequired(field: AbstractControl): boolean {
    return field.hasValidator(Validators.required);
  }

  returnList() {
    this.router.navigate(['/license-work/form', 2]);
  }

  get idField() {
    return this.form.controls['id'];
  }

  get employerField() {
    return this.form.controls['employer'];
  }
  get codeField() {
    return this.form.controls['code'];
  }

  get descriptionField() {
    return this.form.controls['description'];
  }

  get regimeField() {
    return this.form.controls['regime'];
  }

  get daysConstField() {
    return this.form.controls['daysConst'];
  }

  get approvedLevelField() {
    return this.form.controls['approvedLevel'];
  }

  get stateField() {
    return this.form.controls['state'];
  }
}
