import {Hotel} from '../model/hotel.model';
import {HotelNameId} from '../model/hotelnameid.model';

export interface HotelNameIdListResponse extends ListDataResponse{
  data:HotelNameId[];
}
