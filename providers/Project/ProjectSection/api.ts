import service from "services";
import { ProjectSection } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: ProjectSection.ListingAPIPayload,
): Promise<ProjectSection.ListingResponse> {
  return service({
    method: "GET",
    url: `/ProjectSection/GetProjectSectionListing`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: ProjectSection.CreateAPIPayload,
): Promise<ProjectSection.CreateResponse> {
  return service({
    method: "POST",
    url: `/ProjectSection/CreateProjectSection`,
    body: props.data,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}

//Detail
export async function detail(
  props: ProjectSection.DetailAPIPayload,
): Promise<ProjectSection.DetailResponse> {
  return service({
    method: "GET",
    url: `/ProjectSection/GetSingleProjectSection/${props.id}`,
  });
}


// Update
export async function update(
  props: ProjectSection.UpdateAPIPayload,
): Promise<ProjectSection.UpdateResponse> {
  return service({
    method: "PUT",
    url: `/ProjectSection/EditProjectSection/${props.id}`,
    body: props.data,
  });
}

// Remove
export async function remove(
  props: ProjectSection.RemoveAPIPayload,
): Promise<ProjectSection.RemoveResponse> {
  return service({
    method: "DELETE",
    url: `/ProjectSection/SoftDeleteProjectSection/${props.id}`,
  });
}