import {CatalogueModel, LocationModel} from '@models/core';

export interface AddressModel {
    id?: number;
    sector?: CatalogueModel;
    location?: Location;
    mainStreet?: string;
    secondaryStreet?: string;
    number?: string;
    postSode?: string;
    reference?: string;
    latitude?: number;
    longitude?: number;
}
