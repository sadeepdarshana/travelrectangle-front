import {Hotel} from '../model/hotel.model';
import {HotelResult} from '../model/hotelresult.model';

export interface SearchResponse extends ListDataResponse{
  data:HotelResult[];
}

