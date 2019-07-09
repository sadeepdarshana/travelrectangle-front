import { Injectable } from '@angular/core';
import {Hotel} from './shared/model/hotel.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HotelNameIdListResponse} from './shared/responseobject/hotelnameidlistresponse.responseobject';
import {HotelListResponse} from './shared/responseobject/hotellistresponse.responseobject';
import {RoomType} from './shared/model/roomtype.model';
import {RoomTypeListResponse} from './shared/responseobject/roomtypelistresponse.responseobject';
import {Contract} from './shared/model/contract.model';
import {SearchRequest} from './shared/model/searchrequest.model';
import {SearchResponse} from './shared/responseobject/searchresponse.responseobject';



@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  host = "http://localhost:8080/";

  httpOptions = { headers: new HttpHeaders({'Content-Type':  'application/json'}) };

  constructor(private http: HttpClient) { }

  //-----------------------------------------------hotel------------------------------------------
  async getHotel(hotelId:number): Promise<Hotel> {
      return this.http.get<Hotel>(`${this.host}hotels/${hotelId}`).toPromise();
  }

  async getAllHotels(): Promise<HotelListResponse> {
    let params = {params: {nameIdOnly: false.toString()}};
    return this.http.get<HotelListResponse>(`${this.host}hotels/all`,params).toPromise();
  }

  async getAllHotelsNameId(): Promise<HotelNameIdListResponse> {
    let params = {params: {nameIdOnly: true.toString()}};
    return this.http.get<HotelNameIdListResponse>(`${this.host}hotels/all`,params).toPromise();
  }

  async addHotel(hotel:Hotel): Promise<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${this.host}hotels/add`,hotel,this.httpOptions).toPromise();
  }

  //-----------------------------------------------Room Type----------------------------------------
  async addRoomType(roomType:RoomType): Promise<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${this.host}roomtypes/add`,roomType,this.httpOptions).toPromise();
  }

  async getAllRoomTypes(): Promise<RoomTypeListResponse> {
    let params = {params: {nameIdOnly: false.toString()}};
    return this.http.get<RoomTypeListResponse>(`${this.host}roomtypes/all`,params).toPromise();
  }
  async getAllRoomTypesByHotelId(hotelId:number): Promise<RoomTypeListResponse> {
    let params = {params: {hotelId: hotelId.toString()}};
    return this.http.get<RoomTypeListResponse>(`${this.host}roomtypes/byHotelId`,params).toPromise();
  }


  //-----------------------------------------------Room Type----------------------------------------

  async addContract(contract:Contract): Promise<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${this.host}contracts/add`,contract,this.httpOptions).toPromise();
  }

  //-----------------------------------------------Room Type----------------------------------------

  async searchRequest(searchRequest:SearchRequest): Promise<SearchResponse> {
    return this.http.post<SearchResponse>(`${this.host}search/request`,searchRequest,this.httpOptions).toPromise();
  }

}
