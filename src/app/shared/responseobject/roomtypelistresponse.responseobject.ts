import {Hotel} from '../model/hotel.model';
import {RoomType} from '../model/roomtype.model';

export interface RoomTypeListResponse extends ListDataResponse{
  data:RoomType[];
}
