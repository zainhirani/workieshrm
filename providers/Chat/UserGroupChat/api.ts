import service from "services";
import { UserGroup } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: UserGroup.ListingAPIPayload,
): Promise<UserGroup.ListingResponse> {
  return service({
    method: "GET",
    url: `/Chat/UserGroupDetail/${props?.id}`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: UserGroup.CreateAPIPayload,
): Promise<UserGroup.CreateResponse> {
  return service({
    method: "POST",
    url: `/Chat/SendMessageOnGroup/${props.id}`,
    body: props.data,
    headers:{
        "Authorization":Cookies.get("token")
    }
  });
}