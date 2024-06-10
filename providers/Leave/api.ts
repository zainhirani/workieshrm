import service from "services";
import { Leave } from "./types";
import Cookies from "js-cookie";

//GET Month Listing

export async function listing(
  props?: Leave.ListingAPIPayload,
): Promise<Leave.ListingResponse> {
  return service({
    method: "GET",
    url: `/Attendance/LeaveToBeApprove`,
    queryParams: props,
  });
}

//GET Requested Leave Listing

export async function requestedLeaveListing(
    props?: Leave.LeaveRequestedListingAPIPayload,
  ): Promise<Leave.LeaveRequestedListingResponse> {
    return service({
      method: "GET",
      url: `/Attendance/EmployeeLeaveRequested`,
      queryParams: props,
    });
  }

// Reject
export async function reject(
    props: Leave.RejectAPIPayload,
  ): Promise<Leave.RejectResponse> {
    return service({
      method: "PUT",
      url: `/Attendance/RejectLeave/${props.id}`,
      body: props.data,
    });
  }

// Approve
export async function approve(
    props: Leave.ApproveAPIPayload,
  ): Promise<Leave.ApproveResponse> {
    return service({
      method: "PUT",
      url: `/Attendance/ApproveLeave/${props.id}`,
      body: props.data,
    });
  }