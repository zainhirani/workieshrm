export namespace Login {  
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
} 