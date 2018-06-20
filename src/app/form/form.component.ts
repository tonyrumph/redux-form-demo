import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { IFormState } from '../state/application-state';
import { formNameChanged, formSetValidity } from '../actions';

@Component({
  selector: 'piotrek-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() form: IFormState; // We pass the form's state as the input
  @Output() actionsEmitted: EventEmitter<Action[]> = new EventEmitter(); // ...and emit actions that should change the state.
  @Output() formSubmitted: EventEmitter<{}> = new EventEmitter();

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      //micro-optimization: the event on valueChanges stream will be fired only on focus-out, instead of every key press
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.maxLength(10)
      ]
    })
  });

  ngOnInit() {
    // subscribe to disting value changes on each control and emit the event with action as payload
    this.myForm.controls['name'].valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
      this.actionsEmitted.emit([formNameChanged(value)]);
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
  }

  onSubmit() {
    this.formSubmitted.next();
  }

}
