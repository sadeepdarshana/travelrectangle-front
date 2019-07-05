import { Component, OnInit } from '@angular/core';
import Utils from '../utils';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  districtNames = Utils.districts();


  //ngModel fields
  selectedDistrictIndex = 0;
  hotelName = '';
  hotelAddress= '';
  email= '';


  clearInputFields() {
    this.selectedDistrictIndex = 0;
    this.hotelName = '';
    this.hotelAddress= '';
    this.email= '';


    //prevent displaying validation errors till user touches the fields again
    this.emailFormControl.markAsUntouched();
    this.emailFormControl.markAsPristine();
    this.hotelNameFormControl.markAsUntouched();
    this.hotelNameFormControl.markAsPristine();
    this.hotelAddressFormControl.markAsUntouched();
    this.hotelAddressFormControl.markAsPristine();
  }

  submit(){
    if(this.emailFormControl.invalid||this.hotelAddressFormControl.invalid||this.hotelNameFormControl.invalid){
      this.displaySnackBarInvalidInput();
      return;
    }
    this.clearInputFields();
    this.displaySnackBarSuccess();
  }

  displaySnackBarInvalidInput() {
    this.snackBar.open("Please correct all the input fields", '', {
      duration: 2000,
      panelClass: ['invalid-snack-style']
    });
  }
  displaySnackBarSuccess() {
    this.snackBar.open("Successfully added record   ✔", '', {
      duration: 2000,
      panelClass: ['success-snack-style']
    });
  }

  //email input validation related fields
  emailFormControl = new FormControl('', [ Validators.required, Validators.email]);
  hotelNameFormControl = new FormControl('', [ Validators.required]);
  hotelAddressFormControl = new FormControl('', [ Validators.required]);
  matcher = new InputErrorStateMatcher();


  constructor(private snackBar: MatSnackBar) { }
  ngOnInit() {}
}


export class InputErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
