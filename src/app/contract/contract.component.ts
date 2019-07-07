import { Component, OnInit } from '@angular/core';
import {HotelNameId} from '../shared/model/hotelnameid.model';
import {RestApiService} from '../rest-api.service';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  hotels : HotelNameId[];


  //ngModel fields
  hotelId :number;



  clearInputFields() {

  }


  async submit() {

  }

  orderForm: FormGroup;
  items: FormArray;
  constructor(private restApi: RestApiService,
              private toast: ToastrService,
              private formBuilder: FormBuilder) { }


  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  async loadHotels(){

    this.hotels = (await this.restApi.getAllHotelsNameId()).data;
    if(this.hotels!=null && this.hotels.length != 0){
      this.hotelId = this.hotels[0].hotelId;
    }
  }

  ngOnInit() {


    this.loadHotels();


    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([ this.createItem() ])
    });

    this.addItem();
    this.addItem();
    this.addItem();
  }

}
