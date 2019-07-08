import { Component, OnInit } from '@angular/core';
import {HotelNameId} from '../shared/model/hotelnameid.model';
import {RestApiService} from '../rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {InputErrorHighlightableMatcher} from '../shared/shared';
import {RoomType} from '../shared/model/roomtype.model';
import {Contract} from '../shared/model/contract.model';
import * as moment from 'moment';
import {ContractRoomItem} from '../shared/model/contractroomitem.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  hotels : HotelNameId[];
  roomTypes : RoomType[];
  mainForm: FormGroup;

  //ngModel fields
  hotelId :number;


  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());


  clearInputFields() {
    while(this.formArray.length)this.formArray.removeAt(0);
    this.addItem();
  }


  async submit() {

    let startDate = moment(this.startDate.value).format('YYYY-MM-DD');
    let endDate = moment(this.endDate.value).format('YYYY-MM-DD');


    let items =[];

    for(let i of this.formArray.value){
      items.push(new ContractRoomItem(i['roomTypeId'],i['quantity']));
    }

    let contract = new Contract(startDate,endDate,this.hotelId,items);


    try {
      console.info(contract);
      let res = await this.restApi.addContract(contract);
      this.clearInputFields();
      this.toastContractAdded();
    }catch (e) {
      console.error("Error adding hotel");
      this.toastUnspecifiedError();
    }

  }

  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();



  createItem(): FormGroup {
    return this.formBuilder.group({
      roomTypeId: '',
      quantity:''
    });
  }
  toastInvalidInput() {
    this.toastr.error('Please fix errors in inputs','',{positionClass: 'toast-bottom-left',});
  }

  toastContractAdded() {
    this.toastr.success('Contract added to database','',{positionClass: 'toast-bottom-left',});
  }

  toastUnspecifiedError() {
    this.toastr.error('Something went wrong','',{positionClass: 'toast-bottom-left',});
  }
  addItem(): void {
    this.formArray.push(this.createItem());
  }
  removeItem(i: number) {
    this.formArray.removeAt(i);
  }
  get formArray(){
    return this.mainForm.get('items') as FormArray;
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

    this.mainForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ])
    });

  }

  hotelIdChanged() {
    this.loadRoomTypes();
    console.log("hotelId changed "+this.hotelId);
  }


  constructor(private restApi: RestApiService,
              private toast: ToastrService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

}
