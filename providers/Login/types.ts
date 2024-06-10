export namespace Login {  
  export type Item = {
    _id: number;
    Type?: string;
    CompanyName?: string;
    AttendanceStatus?: string;
    Image?: File | string;
    Theme?: {_id:string;Name:string;PrimaryDayColor:string;SecondaryDayColor:string;PrimaryDayFontColor:string;SecondaryDayFontColor:string;PrimaryNightColor:string;SecondaryNightColor:string;PrimaryNightFontColor:string;SecondaryNightFontColor:string;SuccessDayColor:string;SuccessNightColor:string;WarningDayColor:string;WarningNightColor:string;}
  };

  //Listing
  export type ListingProps = {
      // SearchBy?: string | null;
      // Limit?: number | null;
      // Page?: number;
  };
  export type ListingResponse = { data: {items:Item[]};};
  export interface ListingAPIPayload extends ListingProps {}


    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      user: {_id:string;};
      token:string;
      message:string;
    };
    export type CreateMutationPayload = {
      Email: string;
      password: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

    //Login Main
    export type MainLoginProps = {};
    export type MainLoginResponse = {
      user: {_id:string;};
      token:string;
    };
    export type MainLoginMutationPayload = {
      UserId: string;
      password: string;
    };
    export interface MainLoginAPIPayload extends MainLoginProps {
      data: MainLoginMutationPayload;
    }
} 