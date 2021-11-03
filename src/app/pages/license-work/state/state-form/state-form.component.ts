import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StateModel} from "@models/license-work";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbService} from "@services/core/breadcrumb.service";
import {MessageService} from "@services/core";
import {LicenseWorkHttpService} from "@services/license-work";

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Estado';
  buttonTitle: string = 'Crear Estado';


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
      {label: 'Estado', disabled: true},
    ]);
    this.form = this.newForm();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != 'new') {
      this.title = 'Actualizar Estado';
      this.buttonTitle = 'Actualizar Estado';
      this.loadState();
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
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }

  loadState() {
    this.loadingSkeleton = true;
    this.subscriptions.push(
      this.licenseWorkHttpService
        .getState(this.activatedRoute.snapshot.params.id)
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

  store(state: StateModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.storeState(state)
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

  update(state: StateModel): void {
    this.progressBar = true;
    this.subscriptions.push(
      this.licenseWorkHttpService.updateState(state.id!, state)
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
  get nameField() {
    return this.form.controls['name'];
  }
  get codeField() {
    return this.form.controls['code'];
  }
}
