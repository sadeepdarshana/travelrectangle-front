import { Injectable } from '@angular/core';
import {Hotel} from './shared/models/hotel.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  host = "http://localhost:8080/";

  httpOptions = { headers: new HttpHeaders({'Content-Type':  'application/json'}) };

  constructor(private http: HttpClient) { }


  async getHotel(hotelId:number): Promise<Object> {
    try {
      return this.http.get(`${this.host}hotels/${hotelId}`).toPromise();
    }
    catch (error) {
      console.log("error occurred in RestApiService.getHotel");
    }
  }

  async addHotel(hotel:Hotel): Promise<Object> {
    try {
      return this.http.post<Hotel>(`${this.host}hotels/add`,hotel,this.httpOptions).toPromise();
    }
    catch (error) {
      console.log("error occurred in RestApiService.getHotel");
    }
  }
}
