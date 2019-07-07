import {Hotel} from '../model/hotel.model';

export interface HotelListResponse extends ListDataResponse{
  data:Hotel[];
}
