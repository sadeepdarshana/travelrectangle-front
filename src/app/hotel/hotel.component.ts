import { Component, OnInit } from '@angular/core';
import Utils from '../utils';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  districts =Utils.districts();
  selectedDistrict = 0;

  constructor() { }

  ngOnInit() {
  }

}
