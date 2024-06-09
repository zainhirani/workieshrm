export namespace City {
    export type Item = {
      _id: number;
      name: string;
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
  