export namespace OrganizationDetail {  
    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      message: string;
    };
    export type CreateMutationPayload = {
      Name: string;
      CompanyTheme:string;
      DisplayName:string;
      NoOfEmployees:string | number;
      image: File | string |null;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }
}