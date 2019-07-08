export class RoomType {


  public roomTypeId :number;

  constructor(
    public  hotelId :number,
    public roomTypeName : string,
    public roomTypePrice :number,
    public roomTypeCapacity :number,
    public roomTypeMarkup :number
  )

  {  }

}

