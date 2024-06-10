export namespace UserPeer {
    export type Item = {
      _id: number;
      Body?: string;
      CreatedAt?: string;
      EmployeeMessageMedia?: [
      {
        _id:string;
        MessageId:string;    
        Media:File;    
      }
      ];
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
      image: File;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }
}