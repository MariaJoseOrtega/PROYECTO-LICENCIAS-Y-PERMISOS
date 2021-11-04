import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OnExitInterface} from '@shared/interfaces/on-exit.interface';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {MessageService} from '@services/core';
import {LicenseWorkHttpService} from '@services/license-work';
import {HolidayModel, EmployeeModel} from '@models/license-work';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss']
})

export class HolidayFormComponent implements OnInit, OnDestroy, OnExitInterface {
  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Vacaciones';
  buttonTitle: string = 'Crear Vacaciones';
  employees: EmployeeModel[] = [];
  yearRange: string = `1900:${(new Date()).getFullYear()}`;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Home', disabled: true},
      {label: 'Aplicacion', routerLink: ['/license-work/application']},
      {label: 'Dependencia', routerLink: ['/license-work/dependence']},
      {label: 'Employee', routerLink: ['/license-work/employee']},
      {label: 'Empleador', routerLink: ['/license-work/employer']},
      {label: 'Formulario', routerLink: ['/license-work/form']},
      {label: 'Vacaciones', routerLink: ['/license-work/holiday']},
      {label: 'Razones', routerLink: ['/license-work/reason']},
      {label: 'Estado', routerLink: ['/license-work/state']},
    ]);
    this.form = this.newForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != 'new') {
      this.title = 'Actualizar Vacaciones';
      this.buttonTitle = 'Actualizar Vacaciones';
      this.loadHoliday();
    }
    this.loadEmployees();
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
      numberDays: [null],
      year: [null],

    });
  }

  loadHoliday() {
    this.loadingSkeleton = true;
    this.subscriptions.push(
      this.licenseWorkHttpService
      .getHoliday(this.activatedRoute.snapshot.params.id)
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

  store(holiday: HolidayModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.storeHoliday(holiday)
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

  update(holiday: HolidayModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.updateHoliday(holiday.id!, holiday)
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
    this.router.navigate(['/license-work/holiday', 2]);
  }

  get idField() {
    return this.form.controls['id'];
  }

  get employeeField() {
    return this.form.controls['employee'];
  }

  get numberDaysField() {
    return this.form.controls['numberDays'];
  }

  get yearField() {
    return this.form.controls['year'];
  }
}
