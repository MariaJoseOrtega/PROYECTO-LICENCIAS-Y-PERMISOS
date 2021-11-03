import {LocationModel} from '@models/core';
import {EmployeeModel} from "@models/license-work/employee.model";
import {FormModel} from "@models/license-work/form.model";
import {ReasonModel} from "@models/license-work/reason.model";
import {DependenceModel} from "@models/license-work/dependence.model";


export interface ApplicationModel{
  id?: number;
  employee?:EmployeeModel;
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

