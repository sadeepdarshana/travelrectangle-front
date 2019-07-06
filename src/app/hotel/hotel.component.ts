import { Component, OnInit } from '@angular/core';
import Utils from '../shared/utils';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {Hotel} from '../shared/models/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  districtNames = Utils.districts();


  //ngModel fields
  hotelName = '';
  hotelAddress= '';
  hotelDistrictIndex = 0;  //index of selected
  hotelEmail= '';


  clearInputFields() {
    this.hotelName = '';
    this.hotelAddress= '';
    this.hotelDistrictIndex = 0;
    this.hotelEmail= '';


    //prevent displaying validation errors till user touches the fields again
    this.hotelNameFormControl.markAsUntouched();
    this.hotelNameFormControl.markAsPristine();
    this.hotelAddressFormControl.markAsUntouched();
    this.hotelAddressFormControl.markAsPristine();
    this.hotelEmailFormControl.markAsUntouched();
    this.hotelEmailFormControl.markAsPristine();
  }

  async submit(){
    if(this.hotelEmailFormControl.invalid||this.hotelAddressFormControl.invalid||this.hotelNameFormControl.invalid){
      this.displaySnackBarInvalidInput();
      this.hotelNameFormControl.markAsTouched();
      this.hotelAddressFormControl.markAsTouched();
      this.hotelEmailFormControl.markAsTouched();
      return;
    }

    let newHotelInfo = new Hotel(this.hotelName, this.hotelAddress, this.hotelDistrictIndex, this.hotelEmail);

    try {
      await this.restApi.addHotel(newHotelInfo);
      this.clearInputFields();
      this.displaySnackBarSuccess();
    }catch (e) {
      console.error("Error adding hotel");
      this.snackBar.open("Something went wrong", '', {
        duration: 2000,
        panelClass: ['invalid-snack-style']
      });
    }


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

  //hotelEmail input validation related fields
  hotelEmailFormControl = new FormControl('', [ Validators.required, Validators.email]);
  hotelNameFormControl = new FormControl('', [ Validators.required]);
  hotelAddressFormControl = new FormControl('', [ Validators.required]);
  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();


  constructor(private snackBar: MatSnackBar,
              private restApi: RestApiService) { }
  ngOnInit() {}
}


//We should not highlight a text box in red if user has not touched it yet
//even thought its data is invalid. This class does that..
export class InputErrorHighlightableMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
