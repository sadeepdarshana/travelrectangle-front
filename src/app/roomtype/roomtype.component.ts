import { Component, OnInit } from '@angular/core';
import Utils from '../shared/shared';
import {FormControl, Validators} from '@angular/forms';
import {RestApiService} from '../rest-api.service';
import {Hotel} from '../shared/model/hotel.model';
import {ToastrService} from 'ngx-toastr';
import {InputErrorHighlightableMatcher} from '../shared/shared';
import {HotelNameId} from '../shared/model/hotelnameid.model';
import {RoomType} from '../shared/model/roomtype.model';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {

  hotels : HotelNameId[];


  //ngModel fields
  hotelId :number;
  roomTypeName = '';
  roomTypePrice :number;
  roomTypeCapacity :number;
  roomTypeMarkup :number;


  clearInputFields() {
    this.roomTypeName = '';
    this.roomTypePrice= null;
    this.roomTypeCapacity= null;
    this.roomTypeMarkup= null;


    //prevent displaying validation errors till user touches the fields again
    this.roomTypeNameFormControl.markAsUntouched();
    this.roomTypeNameFormControl.markAsPristine();
    this.roomTypePriceFormControl.markAsUntouched();
    this.roomTypePriceFormControl.markAsPristine();
    this.roomTypeCapacityFormControl.markAsUntouched();
    this.roomTypeCapacityFormControl.markAsPristine();
    this.roomTypeMarkupFormControl.markAsUntouched();
    this.roomTypeMarkupFormControl.markAsPristine();
  }

  async submit(){

    if(this.roomTypeMarkupFormControl.invalid||this.roomTypeCapacityFormControl.invalid||this.roomTypePriceFormControl.invalid||this.roomTypeNameFormControl.invalid){
      this.toastInvalidInput();
      this.roomTypeNameFormControl.markAsTouched();
      this.roomTypePriceFormControl.markAsTouched();
      this.roomTypeCapacityFormControl.markAsTouched();
      this.roomTypeMarkupFormControl.markAsTouched();
      return;
    }

    let newRoomTypeInfo = new RoomType(this.hotelId,this.roomTypeName,this.roomTypePrice,this.roomTypeCapacity,this.roomTypeMarkup);

    try {
      let res = await this.restApi.addRoomType(newRoomTypeInfo);
      console.log(res);
      this.clearInputFields();
      this.toastRoomTypeAdded();
    }catch (e) {
      console.error("Error adding room type");
      this.toastUnspecifiedError();
    }


  }

  toastInvalidInput() {
    this.toast.error('Please fix errors in inputs','',{positionClass: 'toast-bottom-left',});
  }

  toastRoomTypeAdded() {
    this.toast.success('Room type added to database','',{positionClass: 'toast-bottom-left',});
  }

  toastUnspecifiedError() {
    this.toast.error('Something went wrong','',{positionClass: 'toast-bottom-left',});
  }

  //validation related fields
  roomTypeCapacityFormControl = new FormControl('', [ Validators.required,Validators.min(1),Validators.max(4)]);
  roomTypeMarkupFormControl = new FormControl('', [ Validators.required,Validators.min(0),Validators.max(100)]);
  roomTypeNameFormControl = new FormControl('', [ Validators.required]);
  roomTypePriceFormControl = new FormControl('', [ Validators.required]);
  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();


  constructor(private restApi: RestApiService,
              private toast: ToastrService) { }


  async loadHotels(){

    this.hotels = (await this.restApi.getAllHotelsNameId()).data;
    if(this.hotels!=null && this.hotels.length != 0){
      this.hotelId = this.hotels[0].hotelId;
    }
  }

  async ngOnInit() {
    this.loadHotels();
  }
}
