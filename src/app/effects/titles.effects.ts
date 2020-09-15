import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { LOAD_TITLES, ILoadTitlesAction, titlesLoaded, loadTitlesFailure } from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Action } from "@ngrx/store";
import { ITitle } from "../state/application-state";
import { TitlesService } from "../titles.service";

@Injectable()
export class TitlesEffects {
    
    constructor(private titlesService: TitlesService, private actions: Actions) { }

    @Effect()
    loadTitles$ = this.actions.ofType(LOAD_TITLES).pipe(
        switchMap((_: ILoadTitlesAction) => {
            return this.titlesService
                .fetchTitles()
                .pipe(map((iTitles: ITitle[]) => {  
                    return titlesLoaded(iTitles);
                }),
                catchError(err => of(loadTitlesFailure(err)))
            // })
            )
        })
    )
}