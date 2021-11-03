import {CatalogueModel} from './catalogue.model';

export interface PhoneModel {
  id?: string;
  operator?: CatalogueModel;
  type?: CatalogueModel;
  number?: string;
  main?: string;
}
