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
    headers:{
      "Authorization":Cookies.get("token")
  }
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
      headers:{
        "Authorization":Cookies.get("token")
    }
    });
  }

  // Apply Leave
export async function create(
  props: Leave.CreateAPIPayload,
): Promise<Leave.CreateResponse> {
  return service({
    method: "POST",
    url: `/Attendance/ApplyLeave`,
    body: props.data,
    formData:true,
    headers:{
        "Authorization":Cookies.get("token")
    }
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
      headers:{
        "Authorization":Cookies.get("token")
    }
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
      headers:{
        "Authorization":Cookies.get("token")
    }
    });
  }