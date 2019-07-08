import {ContractRoomItem} from './contractroomitem.model';

export class SearchRequest {



  constructor(
    public startDate:string,
    public endDate:string,
    public items:ContractRoomItem[]
  )

  {  }

}
