export namespace Task {
    export type Item = {
      _id: number;
      TaskSubject?: string;
      TaskDetail?: string;
      AssignTo?: string;
      DueDate?: string | Date;
      ProjectSection?: string;
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
    export type CreateProps = {
        id:string;
    };
    export type CreateResponse = {
      message: string;
    };
    export type CreateMutationPayload = {
      TaskSubject: string;
      DueDate: string | Date;
      AssignTo: string;
      TaskDetail: string;
      AssignBy?: string;
      ProjectSection?: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

    export type MyListingProps = {
        SearchBy?: string | null;
        Limit?: number | null;
        Page?: number;
      };
      export type MyListingResponse = { data: {
        _id:number | string;
        TaskDetail: string;
        TaskSubject: string;
        DueDate: string;
        ProjectTaskData: {_id:string,Name:string};
      }; count: number };
      export interface MyListingAPIPayload extends MyListingProps {}

// Detail
  export type DetailProps = {
    id: string | number;
  };
  export type DetailResponse = {data:Item}
  export interface DetailAPIPayload extends DetailProps {}

  //Update
  export type UpdateProps = {
    id: number | string;
  };
  export type UpdateResponse = {
    message: string;
  };
  export type UpdateMutationPayload = {
    TaskSubject: string;
    DueDate: string | Date;
    AssignTo: string;
    TaskDetail: string;
    AssignBy?: string;
    ProjectSection?: string;
  };
  export interface UpdateAPIPayload extends UpdateProps {
    data: UpdateMutationPayload;
  }

  //Remove

  export type RemoveProps = {};
  export type RemoveResponse = {
    data: boolean;
  };
  export type RemoveMutationPayload = {
    id: number | string;
  };
  export interface RemoveAPIPayload extends RemoveMutationPayload {}

}