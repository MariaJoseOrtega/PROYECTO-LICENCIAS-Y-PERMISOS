import {LocationModel} from '@models/core';
import {EmployerModel} from "@models/license-work/employer.model";
import {FormModel} from "@models/license-work/form.model";
import {ReasonModel} from "@models/license-work/reason.model";
import {DependenceModel} from "@models/license-work/dependence.model";


export interface ApplicationModel{
  id?: number;
  employer?:EmployerModel;
  form?:FormModel;
  reason?:ReasonModel;
  location?:LocationModel;
  dependence?: DependenceModel;
  type?:boolean;
  dateStartedAt?: Date;
  dateEndedAt?: Date;
  timeStartedAt?: Date;
  timeEndedAt?: Date;
  observations?: string[];
}

