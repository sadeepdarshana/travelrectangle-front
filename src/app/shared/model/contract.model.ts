import {ContractRoomItem} from './contractroomitem.model';

export class Contract {



  constructor(
              public startDate:string,
              public endDate:string,
              public hotelId:number,
              public items:ContractRoomItem[]
  )

  {  }

}

