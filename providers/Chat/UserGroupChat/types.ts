export namespace UserGroup {
    export type Item = {
      _id: number;
      Body?: string;
      createdAt?: string;
      SenderIdMessageData?: {
        _id:string;
        Name:string;    
        Email:string;    
        Image:File;    
        DesignationData:{_id:string;Name:string};    
    };
    GroupMessageIdMessageData:{
      _id:string;
      MessageId:string;    
      Media:File;  
    }
    };
  
    //Listing
    export type ListingProps = {
      id:string;
    };
    export type ListingResponse = { data: {items:Item[]}; };
    export interface ListingAPIPayload extends ListingProps {}
  
  //Create
  export type CreateProps = {
      id:string;
  };
  export type CreateResponse = {
    message: string;
  };
  export type CreateMutationPayload = {
    Body: string;
    Image: File;
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }
}