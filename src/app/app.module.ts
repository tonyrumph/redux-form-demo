import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './reducers/form-reducer';
import { EffectsModule } from '../../node_modules/@ngrx/effects';
import { CountriesEffects } from './effects/countries-effects';

import { TitlesService } from './titles.service';
import { TitlesEffects } from './effects/titles.effects';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    StoreModule.forRoot({
      form: formReducer
    }),
    EffectsModule.forRoot([CountriesEffects, TitlesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
