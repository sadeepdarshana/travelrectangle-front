import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HotelNameId} from '../shared/model/hotelnameid.model';
import {RoomType} from '../shared/model/roomtype.model';
import {ContractRoomItem} from '../shared/model/contractroomitem.model';
import {Contract} from '../shared/model/contract.model';
import Utils, {InputErrorHighlightableMatcher} from '../shared/shared';
import * as moment from 'moment';
import {CapacityCount} from '../shared/model/capacitycount.model';
import {SearchRequest} from '../shared/model/searchrequest.model';
import {SearchResponse} from '../shared/responseobject/searchresponse.responseobject';
import {HotelResult} from '../shared/model/hotelresult.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  startDate:Date;
  mainForm: FormGroup;

  nightsCount:number;

  districtNames = ['Any'].concat(Utils.districts());

  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();
  hotelDistrictIndex: number;

  searched:boolean=false;

  hotelResults:HotelResult[];

  neededRoomsCount= [0,0,0,0];

  totals :number[];

  devDef(){

  }


  clearInputFields() {return;
    while(this.formArray.length)this.formArray.removeAt(0);
    this.addItem();
  }


  async submit() {

    let __startDate = new Date();
    __startDate.setDate(this.startDate.getDate());
    let startDate = moment(__startDate).format('YYYY-MM-DD');
    let endDate = moment(Utils.addDays(__startDate,this.nightsCount-1)).format('YYYY-MM-DD');


    let items =[];


    for(let i of this.formArray.value){
      items.push(new CapacityCount(i['capacity'],i['count']));
      this.neededRoomsCount[i['capacity']-1] = i['count'];
    }

    let searchRequest = new SearchRequest(startDate,endDate,this.hotelDistrictIndex-1,items);


    try {
      console.info(searchRequest);
      this.hotelResults = (await this.restApi.searchRequest(searchRequest)).data;

      this.totals = [];

      for(let hr of this.hotelResults){
        let hotelTotal = 0;
        for(let roomType of hr.roomTypes){
          if(roomType!=null)
            hotelTotal+=roomType.roomTypePrice*this.nightsCount*this.neededRoomsCount[roomType.roomTypeCapacity-1]*(roomType.roomTypeMarkup/100+1);
        }
        this.totals.push(hotelTotal);
      }

      console.log(this.hotelResults);
      //this.toastContractAdded();
      this.searched=true;
    }catch (e) {
      console.error("Error adding hotel");
      this.toastUnspecifiedError();
    }

  }




  createItem(): FormGroup {
    return this.formBuilder.group({
      capacity: '',
      count:''
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

  ngOnInit() {

    this.mainForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ])
    });

  }



  constructor(private restApi: RestApiService,
              private toast: ToastrService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { }
}
