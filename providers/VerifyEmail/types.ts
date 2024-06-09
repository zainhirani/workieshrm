export namespace VerifyEmail {  
    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      Code: string | number;
    };
    export type CreateMutationPayload = {
      Code: string | number;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }
}