import service from "services";
import { Project } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: Project.ListingAPIPayload,
): Promise<Project.ListingResponse> {
  return service({
    method: "GET",
    url: `/Project/GetProjectListing`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: Project.CreateAPIPayload,
): Promise<Project.CreateResponse> {
  return service({
    method: "POST",
    url: `/Project/CreateProject`,
    body: props.data,
    formData:true,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}

//Detail
export async function detail(
  props: Project.DetailAPIPayload,
): Promise<Project.DetailResponse> {
  return service({
    method: "GET",
    url: `/Project/GetSingleProject/${props.id}`,
  });
}