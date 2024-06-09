import service from "services";
import { Meeting } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: Meeting.ListingAPIPayload,
): Promise<Meeting.ListingResponse> {
  return service({
    method: "GET",
    url: `/Meeting/MeetingSchedule`,
    queryParams: props,
    headers:{"Authorization":Cookies.get("EmployeeToken")}
  });
}

// Create
export async function create(
  props: Meeting.CreateAPIPayload,
): Promise<Meeting.CreateResponse> {
  return service({
    method: "POST",
    url: `/Meeting/QuickMeeting`,
    body: props.data,
    headers:{
        "Authorization":Cookies.get("token"),
    }
  });
}

//Detail
export async function detail(
  props: Meeting.DetailAPIPayload,
): Promise<Meeting.DetailResponse> {
  return service({
    method: "GET",
    url: `/Meeting/JoinMeeting/${props.id}`,
    headers:{
        "Authorization":Cookies.get("token"),
    }
  });
}
