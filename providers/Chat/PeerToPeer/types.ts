export namespace PeerToPeer {
    export type Item = {
        _id:string;
        Name:string;
        Email:string;
        LastMessageSentTime:string;
        DesignationData:{_id:string;Name:string;}
    //   _id: number;
    //   Body?: string;
    //   CreatedAt?: string;
    //   EmployeeMessageMedia?: [
    //   {
    //     FileName:string;
    //     FileMedia:string;    
    //   }
    //   ];
    };
  
    //Listing
    export type ListingProps = {
    //   SearchBy?: string | null;
    //   Limit?: number | null;
    //   Page?: number;
    };
    export type ListingResponse = { data: {items:Item[]}; };
    export interface ListingAPIPayload extends ListingProps {}
  
}