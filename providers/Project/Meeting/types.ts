export namespace Meeting {
    export type Item = {
      _id: number;
      Agenda: string;
      Time: string;
      ProjectIdMeetingData: {Name:string};
    };
  
    //Listing
    export type ListingProps = {
      SearchBy?: string | null;
      Limit?: number | null;
      Page?: number;
    };
    export type ListingResponse = { data: Item[]; count: number };
    export interface ListingAPIPayload extends ListingProps {}
  
    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      message: string;
    };
    export type CreateMutationPayload = {
      Employees: string[];
      ProjectId:string;
      Time: string | Date;
      Agenda: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

    // Join
  export type DetailProps = {
    id: number;
  };
  export type DetailResponse = {data:{link:string}}
  export interface DetailAPIPayload extends DetailProps {}

}