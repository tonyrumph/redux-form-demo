import { Action } from "@ngrx/store";
import { ICountry, ICity, ITitle } from "../state/application-state";

export const FORM_NAME_CHANGED = 'FORM_NAME_CHANGED';
export const FORM_SET_VALIDITY = 'FORM_SET_VALIDITY';

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
export const COUNTRIES_LOADED = 'COUNTRIES_LOADED';
export const FORM_COUNTRY_CHANGED = 'FORM_COUNTRY_CHANGED';

export const LOAD_TITLES = 'LOAD_TITLES';
export const LOAD_TITLES_FAILURE = 'LOAD_TITLES_FAILURE';
export const TITLES_LOADED = 'TITLES_LOADED';
export const FORM_TITLE_CHANGED = 'FORM_TITLE_CHANGED';

export const LOAD_CITIES_FOR_COUNTRY = 'LOAD_CITIES_FOR_COUNTRY';
export const CITIES_FOR_COUNTRY_LOADED = 'CITIES_FOR_COUNTRY_LOADED';
export const FORM_CITY_CHANGED = 'FORM_CITY_CHANGED';

export interface IFormNameChangedAction extends Action {
    payload: {
        value: string;
    }
}

export interface IFormSetValidityAction extends Action {
    payload: {
        isValid: boolean;
    }
}

export interface ILoadCountriesAction extends Action {
    payload: {
    }
}

export interface ICountriesLoadedAction extends Action {
    payload: {
        countries: ICountry[]
    }
}

export interface IFormCountryChangedAction extends Action {
    payload: {
        country: ICountry
    }
}

export interface ILoadTitlesAction extends Action {
    payload: {
    }
}

export interface ILoadTitlesFailure extends Action {
    payload: {
    }
}

export interface ITitlesLoadedAction extends Action {
    payload: {
        titles: ITitle[]
    }
}

export interface IFormTitleChangedAction extends Action {
    payload: {
        title: ITitle
    }
}

export interface ILoadCitiesForCountryAction extends Action {
    payload: {
        countryId: string
    }
}

export interface ICitiesForCountryLoadedAction extends Action {
    payload: {
        countryId: string,
        cities: ICity[]
    }
}

export interface IFormCityChangedAction extends Action {
    payload: {
        city: ICity
    }
}

export function formNameChanged(value: string): IFormNameChangedAction {
    return {
        type: FORM_NAME_CHANGED,
        payload: {
            value
        }
    };
}

export function formSetValidity(isValid: boolean): IFormSetValidityAction {
    return {
        type: FORM_SET_VALIDITY,
        payload: {
            isValid
        }
    };
}

export function loadCountries(): ILoadCountriesAction {
    return {
        type: LOAD_COUNTRIES,
        payload: {}
    }
};

export function countriesLoaded(countries: ICountry[]) : ICountriesLoadedAction {
    return {
        type: COUNTRIES_LOADED,
        payload: {
            countries
        }
    }
};

export function formCountryChanged(country: ICountry): IFormCountryChangedAction {
    return {
        type: FORM_COUNTRY_CHANGED,
        payload: {
            country
        }
    }
};

export function loadTitlesFailure(err: any): ILoadTitlesFailure {
    return {
        type: LOAD_TITLES_FAILURE,
        payload: {
            err
        }
    }
};

export function loadTitles(): ILoadTitlesAction {
    return {
        type: LOAD_TITLES,
        payload: {}
    }
};

export function titlesLoaded(titles: ITitle[]) : ITitlesLoadedAction {
    return {
        type: TITLES_LOADED,
        payload: {
            titles
        }
    }
};

export function formTitleChanged(title: ITitle): IFormTitleChangedAction {
    return {
        type: FORM_TITLE_CHANGED,
        payload: {
            title
        }
    }
};

export function loadCitiesForCountry(countryId: string): ILoadCitiesForCountryAction {
    return {
        type: LOAD_CITIES_FOR_COUNTRY,
        payload: {
            countryId
        }
    }
};

export function citiesForCountryLoaded(countryId: string, cities: ICity[]): ICitiesForCountryLoadedAction {
    return {
        type: CITIES_FOR_COUNTRY_LOADED,
        payload: {
            countryId,
            cities
        }
    }
}

export function formCityChanged(city: ICity) : IFormCityChangedAction {
    return {
        type: FORM_CITY_CHANGED,
        payload: {
            city
        }
    }
}