export namespace ProjectSection {
    export type Item = {
      _id: number;
      ProjectId: string;
      Title: string;
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
      ProjectId: string;
      Title: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

    // Detail
  export type DetailProps = {
    id: string | number;
  };
  export type DetailResponse = {data: {data:{Title: string;}}}
  export interface DetailAPIPayload extends DetailProps {}

  //Update
  export type UpdateProps = {
    id: number | string;
  };
  export type UpdateResponse = {
    message: string;
  };
  export type UpdateMutationPayload = {
    Title:string;
  };
  export interface UpdateAPIPayload extends UpdateProps {
    data: UpdateMutationPayload;
  }

  //Remove

  export type RemoveProps = {};
  export type RemoveResponse = {
    message: string;
  };
  export type RemoveMutationPayload = {
    id: number | string;
  };
  export interface RemoveAPIPayload extends RemoveMutationPayload {}

}