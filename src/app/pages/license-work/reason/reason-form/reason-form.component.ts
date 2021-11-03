import { Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BreadcrumbService} from '@services/core/breadcrumb.service';
import {MessageService} from '@services/core';
import {LicenseWorkHttpService} from '@services/license-work';
import {ReasonModel} from '@models/license-work';

@Component({
  selector: 'app-reason-form',
  templateUrl: './reason-form.component.html',
  styleUrls: ['./reason-form.component.scss']
})

export class ReasonFormComponent implements OnInit{

  private subscriptions: Subscription[] = [];
  form: FormGroup;
  progressBar: boolean = false;
  loadingSkeleton: boolean = false;
  title: string = 'Crear Razon';
  buttonTitle: string = 'Crear Razones';
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private licenseWorkHttpService: LicenseWorkHttpService,
    ) 
  {
    this.breadcrumbService.setItems([
      {label: 'Home', disabled: true},
      {label: 'Aplicacion',routerLink: ['/license-work/application']},
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
        this.title = 'Actualizar Razón';
        this.buttonTitle = 'Actualizar Razón';
        this.loadReason();
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
        descriptionOne: [null,[Validators.required]],
        descriptionTwo: [null,[Validators.required]],
        discountableHolidays: [false, [Validators.required]],
        daysMin: [null,[Validators.required]],
        daysMax:[null,[Validators.required]],
       });
  }

      loadReason() {
          this.loadingSkeleton = true;
          this.subscriptions.push(
            this.licenseWorkHttpService
              .getReason(this.activatedRoute.snapshot.params.id)
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

        store(reason: ReasonModel): void {
          this.progressBar = true;
          this.subscriptions.push(
            this.licenseWorkHttpService.storeReason(reason)
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
      
        update(reason: ReasonModel): void {
          this.progressBar = true;
          this.subscriptions.push(
            this.licenseWorkHttpService.updateReason(reason.id!,reason)
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
          this.router.navigate(['/license-work/reason']);
        }

        get idField() {
          return this.form.controls['id'];
        }
      
        get nameField() {
          return this.form.controls['name'];
        }
      
        get descriptionOneField() {
          return this.form.controls['descriptionOne'];
        }
      
        get descriptionTwoField() {
          return this.form.controls['descriptionTwo'];
        }
      
        get discountableHolidaysField() {
          return this.form.controls['discountableHolidays'];
        }

        get daysMinField() {
          return this.form.controls['daysMin'];
        }
       
        get daysMaxField() {
          return this.form.controls['daysMax'];
        }
}