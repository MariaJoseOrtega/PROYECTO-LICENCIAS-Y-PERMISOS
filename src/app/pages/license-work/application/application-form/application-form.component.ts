import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationModel} from '@models/core';
import {EmployeeModel, FormModel, ReasonModel} from '@models/license-work';
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {CoreHttpService, MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";
import {ApplicationModel} from "@models/license-work";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})

export class ApplicationFormComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Solicitud';
  buttonTitle: string = 'Crear Solicitud';

  employees: EmployeeModel[] = [];
  forms: FormModel[] = [];
  reasons: ReasonModel[] = [];
  locations: LocationModel[] = [];

  yearRange: string = `1900:${(new Date()).getFullYear()}`;

  constructor(
    private coreHttpService: CoreHttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Solicitud', disabled: true},
    ]);
    this.form = this.newForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != 'new') {
      this.title = 'Actualizar Solicitud';
      this.buttonTitle = 'Actualizar Solicitud';
      this.loadApplication();
    }
    this.loadEmployees();
    this.loadForms();
    this.loadReasons();
    this.loadLocations();
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
      employee: [null, [Validators.required]],
      form: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      location: [null, [Validators.required]],
      type: [false, [Validators.required]],
      dateStartedAt: [null, [Validators.required]],
      dateEndedAt: [null, [Validators.required]],
      timeStartedAt: [null, [Validators.required]],
      timeEndedAt: [null, [Validators.required]],
      observations: this.formBuilder.array([this.formBuilder.control(null, Validators.required)]),
    });
  }

  loadApplication() {
    this.loadingSkeleton = true;
    this.subscriptions.push(
      this.licenseWorkHttpService
        .getApplication(this.activatedRoute.snapshot.params.id)
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

  loadEmployees() {
    this.subscriptions.push(
      this.licenseWorkHttpService.getCatalogueEmployees()
        .subscribe(
          response => {
            this.employees = response.data;
          }, error => {
            this.messageService.error(error);
          }
        ));
  }

  loadForms() {
    this.subscriptions.push(
      this.licenseWorkHttpService.getCatalogueForms()
        .subscribe(
          response => {
            this.forms = response.data;
          }, error => {
            this.messageService.error(error);
          }
        ));
  }

  loadReasons() {
    this.subscriptions.push(
      this.licenseWorkHttpService.getCatalogueReasons()
        .subscribe(
          response => {
            this.reasons = response.data;
          }, error => {
            this.messageService.error(error);
          }
        ));
  }

  loadLocations() {
    this.subscriptions.push(
      this.coreHttpService.getLocations('PROVINCE')
        .subscribe(
          response => {
            this.locations = response.data;
          }, error => {
            this.messageService.error(error);
          }
        ));
  }

  addObservations(data: string = '') {
    this.observationsField.push(this.formBuilder.control(data, Validators.required));
  }
  removeObservations(index: number) {
    if (this.observationsField.length > 1)
      this.observationsField.removeAt(index);
    else
      this.messageService.errorRequired();
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

  store(application: ApplicationModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.storeApplication(application)
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

  update(application: ApplicationModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.updateApplication(application.id!, application)
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
    this.router.navigate(['/license-work', 2]);
  }

  get idField() {
    return this.form.controls['id'];
  }
  get employeeField() {
    return this.form.controls['employee'];
  }
  get formField() {
    return this.form.controls['form'];
  }
  get reasonField() {
    return this.form.controls['reason'];
  }
  get locationField() {
    return this.form.controls['location'];
  }
  get typeField() {
    return this.form.controls['type'];
  }
  get dateStartedAtField() {
    return this.form.controls['dateStartedAt'];
  }
  get dateEndedAtField() {
    return this.form.controls['dateEndedAt'];
  }
  get timeStartedAtField() {
    return this.form.controls['timeStartedAt'];
  }
  get timeEndedAtField() {
    return this.form.controls['timeEndedAt'];
  }
  get observationsField(): FormArray{
    return this.form.controls['observations']as FormArray;
  }
}

