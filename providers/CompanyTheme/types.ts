export namespace CompanyTheme {
    export type Item = {
      _id: number;
      Name: string;
      PrimaryColor: string;
      SecondaryColor: string;
      PrimaryFontColor: string;
      SecondaryFontColor: string;
      Status?: boolean;
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
  