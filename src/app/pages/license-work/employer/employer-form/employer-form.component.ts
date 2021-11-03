import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";
import {EmployerModel} from "@models/license-work";

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss']
})
export class EmployerFormComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Empleador';
  buttonTitle: string = 'Crear Empleador';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/dashboard']},
      {label: 'Formulario', disabled: true},
    ]);
    this.form = this.newForm();
    
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != 'new') {
      this.title = 'Actualizar Empleador';
      this.buttonTitle = 'Actualizar Empleador';
      this.loadEmployer();
    }
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
      logo:[null],
      department:[null],
      coordination:[null],
      unit:[null],
      approvalName:[null],
      registerName:[null],
    });
  }

  loadEmployer() {
    this.loadingSkeleton = true;
    this.subscriptions.push(
      this.licenseWorkHttpService
      .getEmployer(this.activatedRoute.snapshot.params.id)
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

  store(employer: EmployerModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.storeEmployer(employer)
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

  update(employer: EmployerModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.updateEmployer(employer.id!, employer)
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
    this.router.navigate(['/license-work/employer', 2]);
  }

  get idField() {
    return this.form.controls['id'];
  }

  get logoField() {
    return this.form.controls['logo'];
  }

  get departmentField() {
    return this.form.controls['department'];
  }

  get coordinationField() {
    return this.form.controls['coordination'];
  }

  get unitField() {
    return this.form.controls['unit'];
  }

  get  approvalNameField() {
    return this.form.controls['approvalName'];
  }

  get registerNameField() {
    return this.form.controls['registerName'];
  }
}

        
        
        
       
        