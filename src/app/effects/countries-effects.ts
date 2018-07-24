import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { LOAD_COUNTRIES, ILoadCountriesAction, countriesLoaded, LOAD_CITIES_FOR_COUNTRY, ILoadCitiesForCountryAction, citiesForCountryLoaded } from "../actions";
import { switchMap } from "rxjs/operators";
import { Observable, Observer } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class CountriesEffects {
    
    constructor(private actions: Actions) { }

    @Effect()
    loadCountries$ = this.actions.ofType(LOAD_COUNTRIES).pipe(
        switchMap((_: ILoadCountriesAction) => {
            return Observable.create((observer: Observer<Action>) => {
                observer.next(countriesLoaded([{
                    id: 'pl',
                    name: 'Poland'
                }, {
                    id: 'en',
                    name: 'England'
                }, {
                    id: 'be',
                    name: 'Belgium'
                }]));
                observer.complete();
            });
        })
    );

    @Effect()
    loadCitiesFormCountry$ = this.actions.ofType(LOAD_CITIES_FOR_COUNTRY).pipe(
        switchMap((action: ILoadCitiesForCountryAction) => {
            return Observable.create((observer: Observer<Action>) => {
                if(action.payload.countryId === 'pl') {
                    observer.next(citiesForCountryLoaded(action.payload.countryId, [
                        { id: 'pl-krk', name: 'Kraków' },
                        { id: 'pl-war', name: 'Warsaw' },
                        { id: 'pl-wro', name: 'Wrocław' }
                    ]));
                } else if(action.payload.countryId === 'en') {
                    observer.next(citiesForCountryLoaded(action.payload.countryId, [
                        { id: 'en-lon', name: 'London' }
                    ]));
                } else if(action.payload.countryId === 'be') {
                    observer.next(citiesForCountryLoaded(action.payload.countryId, [
                        { id: 'be-anr', name: 'Antwerp' },
                        { id: 'be-bru', name: 'Brussels' }
                    ]));
                } else {
                    throw new Error('Unknown country');
                }
            });
        })
    )
}