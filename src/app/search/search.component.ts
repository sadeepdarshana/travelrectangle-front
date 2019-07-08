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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  startDate:Date;
  mainForm: FormGroup;

  nightsCount:number;

  clearInputFields() {
    while(this.formArray.length)this.formArray.removeAt(0);
    this.addItem();
  }


  async submit() {

    let startDate = moment(this.startDate).format('YYYY-MM-DD');
    let endDate = moment(Utils.addDays(this.startDate,this.nightsCount-1)).format('YYYY-MM-DD');


    let items =[];

    for(let i of this.formArray.value){
      items.push(new CapacityCount(i['capacity'],i['count']));
    }

    let searchRequest = new SearchRequest(startDate,endDate,items);


    try {
      console.info(searchRequest);
      let res = await this.restApi.searchRequest(searchRequest);
      this.clearInputFields();
      this.toastContractAdded();
    }catch (e) {
      console.error("Error adding hotel");
      this.toastUnspecifiedError();
    }

    console.log(searchRequest);
  }

  inputErrorHighlightableMatcher = new InputErrorHighlightableMatcher();



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
