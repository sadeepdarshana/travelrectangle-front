import { Component, OnInit } from '@angular/core';
import Utils from '../utils';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  districts =Utils.districts();
  selectedDistrict = 3;

  hotelName = '';
  hotelAddress: '';
  hotelDistrictId: 1;

  constructor(private snackBar: MatSnackBar) { }


  ngOnInit() {
  }


  successSnackBar() {
    this.snackBar.open("Successfully added record   ✔", '', {
      duration: 2000,
      panelClass: ['success-snack-style']
    });
  }
}
