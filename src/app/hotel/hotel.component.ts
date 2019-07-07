import { Component, OnInit } from '@angular/core';
import Utils from '../shared/shared';
import {FormControl, Validators} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {Hotel} from '../shared/model/hotel.model';
import {ToastrService} from 'ngx-toastr';
import {InputErrorHighlightableMatcher} from '../shared/shared';

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
      this.toastInvalidInput();
      this.hotelNameFormControl.markAsTouched();
      this.hotelAddressFormControl.markAsTouched();
      this.hotelEmailFormControl.markAsTouched();
      return;
    }

    let newHotelInfo = new Hotel(this.hotelName, this.hotelAddress, this.hotelDistrictIndex, this.hotelEmail);

    try {
      let res = await this.restApi.addHotel(newHotelInfo);
      console.info("hotel added");
      this.clearInputFields();
      this.toastHotelAdded();
    }catch (e) {
      console.error("Error adding hotel");
      this.toastUnspecifiedError();
    }


  }

  toastInvalidInput() {
    this.toastr.error('Please fix errors in inputs','',{positionClass: 'toast-bottom-left',});
  }

  toastHotelAdded() {
    this.toastr.success('Hotel added to database','',{positionClass: 'toast-bottom-left',});
  }

  toastUnspecifiedError() {
    this.toastr.error('Something went wrong','',{positionClass: 'toast-bottom-left',});
  }

  //input validation related fields
  hotelEmailFormControl = new FormControl('', [ Validators.required, Validators.email]);
  hotelNameFormControl = new FormControl('', [ Validators.required]);
  hotelAddressFormControl = new FormControl('', [ Validators.required]);
  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();


  constructor(private restApi: RestApiService,
              private toastr: ToastrService) { }
  ngOnInit() {}
}


