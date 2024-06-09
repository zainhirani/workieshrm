export namespace Employee {  
  export type Item = {
    _id: number;
    Name: string;
    Email: string;
    Mobile: string;
    IdentityNumber: string;
    DOB: string;
    DateOfJoining: string;
    MartialStatus: string;
    Designation: string;
    City: string;
    Address: string;
    PermanentAddress: string;
    ZipCode:string;
    image:string;
  };

  //Listing
  export type ListingProps = {
    size?: string | null;
    page?: number | null;
    Name?: number;
  };
  export type ListingResponse = { data: {items:Item[]}; count: number };
  export interface ListingAPIPayload extends ListingProps {}

    //Create
    export type CreateProps = {};
    export type CreateResponse = {
      Name: string;
      token:string;
    };
    export type CreateMutationPayload = {
      Name: string;
      Email: string;
      Password: string;
      Mobile:string;
      IdentityNumber:string;
      DOB:string | Date;
      DateOfJoining:string | Date;
      MartialStatus:string;
      Designation:string;
      ReportingAuthority:string;
      City:string;
      Address:string;
      PermanentAddress:string;
      ZipCode:string;
      image: string;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

  // DetailBYId
  export type DetailProps = {
    _id: number;
  };
  export type DetailResponse = {
    _id: number;
    Name: string;
    Email: string;
    Image: string;
    Mobile: string;
    IdentityNumber: string;
    DOB?: string | Date;
    DateOfJoining?: string | Date;
    MartialStatusData: {name:string};
    Designation: string;
    Address: string;
    PermanentAddress: string;
    ZipCode: string | number;
    
  };
  export interface DetailAPIPayload extends DetailProps {}
}