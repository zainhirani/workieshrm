export namespace Documents {  
    //Create
    export type CreateProps = {
    };
    export type CreateResponse = {
      message: string | number;
    };
    export type CreateMutationPayload = {
        DocumentName: string | number;
        image: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }
}