import {CatalogueModel} from './catalogue.model';

export interface UserModel {
  id?: number;
  identificationType?: CatalogueModel;
  sex?: CatalogueModel;
  gender?: CatalogueModel;
  ethnicOrigin?: CatalogueModel;
  bloodType?: CatalogueModel;
  civilStatus?: CatalogueModel;
  phones?: CatalogueModel[];
  avatar?: string;
  username?: string;
  lastname?: string;
  name?: string;
  email?: string;
  birthdate?: string;
}
