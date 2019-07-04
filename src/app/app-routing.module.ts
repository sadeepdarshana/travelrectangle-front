import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HotelComponent} from './hotel/hotel.component';
import {ContractComponent} from './contract/contract.component';
import {RoomtypeComponent} from './roomtype/roomtype.component';

const routes: Routes = [
  { path: 'hotel', component: HotelComponent },
  { path: 'roomtype', component: RoomtypeComponent },
  { path: 'contract', component: ContractComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
