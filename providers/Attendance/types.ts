export namespace Attendance {
    export type Item = {
      _id: number;
      Arrival?: Date | string;
      Departure?: Date | string;
      Day?: Date | string;
      AttendanceStatus?: string;
      LeaveApprovalStatus?: boolean | string;
    };
  
    //Attendance Listing
    export type ListingProps = {
      StartDate?: string | Date;
      EndDate?: number | Date;
    };
    export type ListingResponse = { data: {items:Item[]}; AttendanceSummary: {
        TimeCompleted?: string;
        LeaveApprovedCount?: number | string;
        PresentCount?: number | string;
        LeaveEarlierCount?: number | string;
        LeaveCount?: number | string;
    }};
    export interface ListingAPIPayload extends ListingProps {}
  
    //Attendance Employee Time
    export type EmployeeTimeListingProps = {
        SearchBy?: string | null;
        Limit?: number | null;
        Page?: number;
      };
      export type EmployeeTimeListingResponse = { data: {items:Item[]};};
      export interface EmployeeTimeListingAPIPayload extends EmployeeTimeListingProps {}

    //Mark Attendance
    export type CreateProps = {};
    export type CreateResponse = {
      message: string;
    };
    export type CreateMutationPayload = {
      Arrival: Date | string;
      Departure: string | Date;
    };
    export interface CreateAPIPayload extends CreateProps {
      data: CreateMutationPayload;
    }

    //Time In
    export type CreateTimeInProps = {};
    export type CreateTimeInResponse = {
      message: string;
    };
    export type CreateTimeInMutationPayload = {
      Arrival: Date | string;
      Departure: string | Date;
    };
    export interface CreateTimeInAPIPayload extends CreateTimeInProps {
      data: CreateTimeInMutationPayload;
    }

    //Time Out
    export type CreateTimeOutProps = {};
    export type CreateTimeOutResponse = {
      message: string;
    };
    export type CreateTimeOutMutationPayload = {
      Arrival: Date | string;
      Departure: string | Date;
    };
    export interface CreateTimeOutAPIPayload extends CreateTimeOutProps {
      data: CreateTimeOutMutationPayload;
    }

}