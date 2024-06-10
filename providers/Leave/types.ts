export namespace Leave {
    export type Item = {
      _id: number;
      Day?: Date | string;
      LeaveApprovalStatus?: boolean | string;
      AttendanceStatus?: string;
      EmployeeAttendanceData?: {_id:string;Name:string;Email:string;Image:string}
    };
  
    //Listing
    export type ListingProps = {
        SearchBy?: string | null;
        Limit?: number | null;
        Page?: number;
    };
    export type ListingResponse = { data: {items:Item[]};};
    export interface ListingAPIPayload extends ListingProps {}
  
    //Leave Requested Listing
    export type LeaveRequestedListingProps = {
        SearchBy?: string | null;
        Limit?: number | null;
        Page?: number;
      };
      export type LeaveRequestedListingResponse = { data: {items:Item[]};};
      export interface LeaveRequestedListingAPIPayload extends LeaveRequestedListingProps {}

    //Reject Leave
    export type RejectProps = {
        id: number | string;
    };
    export type RejectResponse = {
        message: string;
    };
    export type RejectMutationPayload = {
        Arrival: string | Date
        Departure: string | Date;
    };
    export interface RejectAPIPayload extends RejectProps {
        data: RejectMutationPayload;
    }

    //Approve Leave
    export type ApproveProps = {
        id: number | string;
    };
    export type ApproveResponse = {
        message: string;
    };
    export type ApproveMutationPayload = {
        Arrival: string | Date
        Departure: string | Date;
    };
    export interface ApproveAPIPayload extends ApproveProps {
        data: ApproveMutationPayload;
    }
}