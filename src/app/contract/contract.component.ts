import { Component, OnInit } from '@angular/core';
import {HotelNameId} from '../shared/model/hotelnameid.model';
import {RestApiService} from '../rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {InputErrorHighlightableMatcher} from '../shared/shared';
import {RoomType} from '../shared/model/roomtype.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  hotels : HotelNameId[];
  roomTypes : RoomType[];
  orderForm: FormGroup;

  //ngModel fields
  hotelId :number;



  clearInputFields() {

  }


  async submit() {

  }

  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();



  constructor(private restApi: RestApiService,
              private toast: ToastrService,
              private formBuilder: FormBuilder) { }


  createItem(): FormGroup {
    return this.formBuilder.group({
      roomTypeId: '',
      quantity:''
    });
  }

  addItem(): void {
    this.formArray.push(this.createItem());
  }


  removeItem(i: number) {
    this.formArray.removeAt(i);
  }

  get formArray(){
    return this.orderForm.get('items') as FormArray;
  }

  async loadHotels(){

    this.hotels = (await this.restApi.getAllHotelsNameId()).data;
    if(this.hotels!=null && this.hotels.length != 0){
      this.hotelId = this.hotels[0].hotelId;
      this.loadRoomTypes();
    }
  }
  async loadRoomTypes(){
    try {

      this.roomTypes = (await this.restApi.getAllRoomTypesByHotelId(this.hotelId)).data;
    }catch (e) {
      console.log("error occurred")
    }
  }

  ngOnInit() {


    this.loadHotels();

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ])
    });

  }

  hotelIdChanged() {
    this.loadRoomTypes();
    console.log("hotelId changed "+this.hotelId);
  }

}
