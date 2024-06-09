import service from "services";
import { Task } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: Task.ListingAPIPayload,
): Promise<Task.ListingResponse> {
  return service({
    method: "GET",
    url: `/Task/GetTaskListing`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: Task.CreateAPIPayload,
): Promise<Task.CreateResponse> {
  return service({
    method: "POST",
    url: `/EmployeeTask/CreateEmployeeTask/${props.id}`,
    body: props.data,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}

export async function taskListing(
    props?: Task.MyListingAPIPayload,
  ): Promise<Task.MyListingResponse> {
    return service({
      method: "GET",
      url: `/EmployeeTask/MyTask`,
      queryParams: props,
      headers:{"Authorization": Cookies.get("EmployeeToken")}
    });
  }

  //Detail
export async function detail(
  props: Task.DetailAPIPayload,
): Promise<Task.DetailResponse> {
  return service({
    method: "GET",
    url: `/EmployeeTask/GetSingleEmployeeTask/${props.id}`,
  });
}

// Update
export async function update(
  props: Task.UpdateAPIPayload,
): Promise<Task.UpdateResponse> {
  return service({
    method: "PUT",
    url: `/EmployeeTask/EditEmployeeTask/${props.id}`,
    body: props.data,
  });
}

// Remove
export async function remove(
  props: Task.RemoveAPIPayload,
): Promise<Task.RemoveResponse> {
  return service({
    method: "DELETE",
    url: `/EmployeeTask/SoftDeleteEmployeeTask/${props.id}`,
  });
}