

export namespace CompanyDetail {
  export type Item = {
    _id: number;
    Name: string;
    OrganizationName: boolean;
    OrganizationType: number;
    Email: string;
    PrimaryMobileNo: string | number;
    SecondaryMobileNo?: string | number;
    CardNumber:string | number;
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
    token: string;
  };
  export type CreateMutationPayload = {
    Name: string;
    OrganizationName: boolean;
    OrganizationType: {_id:string | number;Name:string}
    Email: string;
    PrimaryMobileNo: string | number;
    SecondaryMobileNo?: string | number;
    CardNumber:string | number;
  };
  export interface CreateAPIPayload extends CreateProps {
    data: CreateMutationPayload;
  }

  // // Detail
  // export type DetailProps = {
  //   id: number;
  // };
  // export type DetailResponse = {
  //   id: number;
  //   course_name: string;
  //   active: boolean;
  //   userId: number;
  //   createdAt: string | Date;
  //   updatedAt: string | Date;
  //   deletedAt?: string | Date | null;
  //   course?: {
  //     courseId: number | null;
  //     programs: string | null;
  //     clas: string | undefined;
  //   };
  // };
  // export interface DetailAPIPayload extends DetailProps {}

  // //Update
  // export type UpdateProps = {
  //   id: number;
  // };
  // export type UpdateResponse = {
  //   data: boolean;
  // };
  // export type UpdateMutationPayload = {
  //   course_name: string;
  // };
  // export interface UpdateAPIPayload extends UpdateProps {
  //   data: UpdateMutationPayload;
  // }

  // //Remove

  // export type RemoveProps = {};
  // export type RemoveResponse = {
  //   data: boolean;
  // };
  // export type RemoveMutationPayload = {
  //   id: number;
  // };
  // export interface RemoveAPIPayload extends RemoveMutationPayload {}

  // //Duplicate
  // export type DuplicateProps = {};
  // export type DuplicateResponse = {
  //   data: boolean;
  // };
  // export type DuplicateMutationPayload = {
  //   id: number;
  // };
  // export interface DuplicateAPIPayload extends DuplicateMutationPayload {}
}
