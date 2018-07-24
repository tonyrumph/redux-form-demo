import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { IFormState, ICity } from '../state/application-state';
import { formNameChanged, formSetValidity, formCountryChanged, loadCitiesForCountry, formCityChanged } from '../actions';

@Component({
  selector: 'piotrek-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() form: IFormState = { isValid: false, isDirty: false }; // We pass the form's state as the input
  @Output() actionsEmitted: EventEmitter<Action[]> = new EventEmitter(); // ...and emit actions that should change the state.
  @Output() formSubmitted: EventEmitter<{}> = new EventEmitter();

  myForm: FormGroup = new FormGroup({
    name: new FormControl(this.form.name, {
      //micro-optimization: the event on valueChanges stream will be fired only on focus-out, instead of every key press
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.maxLength(10)
      ]
    }),
    country: new FormControl(this.form.country),
    city: new FormControl({ disabled: true, value: this.form.city })
  });

  ngOnInit() {
    // subscribe to disting value changes on each control and emit the event with action as payload
    this.myForm.controls['name'].valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
      this.actionsEmitted.emit([formNameChanged(value)]);
    });
    this.myForm.controls['country'].valueChanges.pipe(distinctUntilChanged((x, y) => x === y || (x ? x.id : undefined) === (y ? y.id : undefined))).subscribe((value) => {      
      let actions: Action[] = [formCountryChanged(value)];
      if(value) {
        this.myForm.controls['city'].enable();
        actions = [...actions, loadCitiesForCountry(value.id)]
      } else {
        this.myForm.controls['city'].disable();
      }
      this.actionsEmitted.emit(actions);
    });
    this.myForm.controls['city'].valueChanges.pipe(distinctUntilChanged((x, y) => x === y || (x ? x.id : undefined) === (y ? y.id : undefined))).subscribe((value: ICity) => {
      this.actionsEmitted.emit([formCityChanged(value)]);
    });

    this.myForm
        .statusChanges
        .pipe(
          distinctUntilChanged(), 
          map(status => status === 'VALID'))
        .subscribe(isValid => {
          this.actionsEmitted.emit([formSetValidity(isValid)]);  
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.form || changes.form.isFirstChange()) {
      return;
    }

    // whenever input changes (and input is the form's state in the store), we update the value of the control
    this.myForm.controls['name'].setValue(changes.form.currentValue.name);

    this.myForm.controls['country'].setValue(changes.form.currentValue.country);
    this.myForm.controls['city'].setValue(changes.form.currentValue.city);
  }

  onSubmit() {
    this.formSubmitted.next();
  }

}
