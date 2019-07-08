import {ContractRoomItem} from './contractroomitem.model';
import {CapacityCount} from './capacitycount.model';

export class SearchRequest {



  constructor(
    public startDate:string,
    public endDate:string,
    public items:CapacityCount[]
  )

  {  }

}
