import {RoomType} from './roomtype.model';

export class HotelResult {



  constructor(
    public roomTypes:RoomType[],
              public hotelName:string,
              public hotelAddress:string,
              public hotelDistrictIndex:number,
              public hotelEmail:string,
  )

  {  }

}

