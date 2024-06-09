export namespace MaritalStatus {
    export type Item = {
      _id: number;
      Name: string;
      Description: string;
    };
  
    //Listing
    export type ListingProps = {
      size?: string | null;
      page?: number | null;
      Name?: number;
    };
    export type ListingResponse = { data: {items:Item[]}; count: number };
    export interface ListingAPIPayload extends ListingProps {}
  }
  