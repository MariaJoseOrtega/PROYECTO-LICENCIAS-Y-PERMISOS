import {CatalogueModel} from '@models/core';

export interface LocationModel {
    id?: number;
    parent?: LocationModel;
    type?: CatalogueModel;
    code?: string;
    name?: string;
    alpha2Code?: string;
    alpha3Code?: string;
    region?: string;
    subregion?: string;
    callingCode?: string;
    capital?: string;
    topLevelDomain?: string;
    flag?: string;
    timezones?: Array<string>;
}
