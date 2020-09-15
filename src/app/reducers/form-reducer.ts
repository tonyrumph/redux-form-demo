import { IFormState, getDefaultFormState } from "../state/application-state";
import { Action } from '@ngrx/store';
import { IFormNameChangedAction, FORM_NAME_CHANGED, FORM_SET_VALIDITY, IFormSetValidityAction, COUNTRIES_LOADED, ICountriesLoadedAction, FORM_COUNTRY_CHANGED, IFormCountryChangedAction, CITIES_FOR_COUNTRY_LOADED, ICitiesForCountryLoadedAction, FORM_CITY_CHANGED, IFormCityChangedAction, FORM_TITLE_CHANGED, TITLES_LOADED, IFormTitleChangedAction, ITitlesLoadedAction } from "../actions";

export function formReducer(state: IFormState = getDefaultFormState(), action: Action): IFormState {
    switch(action.type) {
        case FORM_NAME_CHANGED: {
            const typedAction = <IFormNameChangedAction>action;
            return { ...state, name: typedAction.payload.value, isDirty: true };
        }
        case FORM_SET_VALIDITY: {
            const typedAction = <IFormSetValidityAction>action;
            return { ...state, isValid: typedAction.payload.isValid };
        }
        case COUNTRIES_LOADED: {
            const typedAction = <ICountriesLoadedAction>action;
            return { ...state, countries: typedAction.payload.countries };
        }
        case FORM_COUNTRY_CHANGED: {
            const typedAction = <IFormCountryChangedAction>action;
            return { ...state, country: typedAction.payload.country, isDirty: true };
        }
        case TITLES_LOADED: {
            const typedAction = <ITitlesLoadedAction>action;
            return { ...state, titles: typedAction.payload.titles };
        }
        case FORM_TITLE_CHANGED: {
            const typedAction = <IFormTitleChangedAction>action;
            return { ...state, title: typedAction.payload.title, isDirty: true };
        }
        case CITIES_FOR_COUNTRY_LOADED: {
            const typedAction = <ICitiesForCountryLoadedAction>action;
            return { ...state, cities: typedAction.payload.cities };
        }
        case FORM_CITY_CHANGED: {
            const typedAction = <IFormCityChangedAction>action;
            return { ...state, city: typedAction.payload.city };
        }
        default: {
            return state;
        }
    }
}