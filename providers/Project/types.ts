export namespace Project {
    export type Item = {
      _id: number;
      Name?: string;
      Description?: string;
      ProjectAssignTo?: string;
      RecurringMeetingDay?: string;
      Deadline?: string | Date;
    };
  
    //Listing
    export type ListingProps = {
      SearchBy?: string | null;
      Limit?: number | null;
      Page?: number;
    };
    export type ListingResponse = { data: {items:Item[]}; count: number };
    export interface ListingAPIPayload extends ListingProps {}
  
    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      message: string;
    };
    export type CreateMutationPayload = {
      Name: string;
      Deadline: string | Date;
      ProjectAssignTo: string;
      Description: string;
      Document: string;
      RecurringMeetingDay?: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

// Detail
  export type DetailProps = {
    id: number | string;
  };
  export type DetailResponse = {
    data:{
    _id: number;
    Name: string;
    Description: string;
    RecurringMeetingDay: string;
    ProjectAssignToData?: {
      _id: number | string;
      Name: string;
    };
    CompanyProjectSectionData:{
      Title:string;
      _id:string;
      ProjectSectionData:{
        _id:string;
        TaskSubject:string;
        TaskDetail:string;
      }[]
    }[]
  }
  };
  export interface DetailAPIPayload extends DetailProps {}

}