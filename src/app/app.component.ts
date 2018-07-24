import { Component } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { IApplicationState, IFormState } from './state/application-state';
import { loadCountries } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public formState: IFormState;

  constructor(private store: Store<IApplicationState>) {
    // Subscribe to the newest version of the formState:
    this.store.pipe(select(e => e.form)).subscribe(fs => {
      this.formState = fs;

      if(!fs.countries) {
        this.store.dispatch(loadCountries());
      }
    });
  }

  onFormActions($event: Action[]) {
    // whenever form (child) component emits event with actions as payload, dispatch them
    const actions = $event;
    actions.forEach(this.store.dispatch.bind(this.store));
  }

  onFormSubmitted() {
    // this is the place where we should dispatch the action to effects
    console.log(this.formState);
  }

}
