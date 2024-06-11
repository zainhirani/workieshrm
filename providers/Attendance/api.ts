import service from "services";
import { Attendance } from "./types";
import Cookies from "js-cookie";

//GET Month Listing

export async function listing(
  props?: Attendance.ListingAPIPayload,
): Promise<Attendance.ListingResponse> {
  return service({
    method: "GET",
    url: `/Attendance/EmployeeAttendanceCalender`,
    queryParams: props,
    headers:{
      "Authorization":Cookies.get("token")
  }
  });
}

//GET Employee Time Listing

export async function timeListing(
    props?: Attendance.EmployeeTimeListingAPIPayload,
  ): Promise<Attendance.EmployeeTimeListingResponse> {
    return service({
      method: "GET",
      url: `/Attendance/EmployeeTime`,
      queryParams: props,
      headers:{
        "Authorization":Cookies.get("token")
    }
    });
  }

// Mark Attendance
export async function create(
  props: Attendance.CreateAPIPayload,
): Promise<Attendance.CreateResponse> {
  return service({
    method: "POST",
    url: `/Attendance/MarkAttendance`,
    body: props.data,
    formData:true,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}

// Time In Attendance
export async function createTimeIn(
  props: Attendance.CreateTimeInAPIPayload,
): Promise<Attendance.CreateTimeInResponse> {
  return service({
    method: "POST",
    url: `/Attendance/TimeIn`,
    body: props.data,
    formData:true,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}

// Time Out Attendance
export async function createTimeOut(
  props: Attendance.CreateTimeOutAPIPayload,
): Promise<Attendance.CreateTimeOutResponse> {
  return service({
    method: "POST",
    url: `/Attendance/TimeOut`,
    body: props.data,
    formData:true,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}
