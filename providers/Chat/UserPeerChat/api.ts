import service from "services";
import { UserPeer } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: UserPeer.ListingAPIPayload,
): Promise<UserPeer.ListingResponse> {
  return service({
    method: "GET",
    url: `/Chat/UserPeerChat/${props?.id}`,
    queryParams: props,
  });
}

// Create
export async function create(
    props: UserPeer.CreateAPIPayload,
  ): Promise<UserPeer.CreateResponse> {
    return service({
      method: "POST",
      url: `/Chat/SendMessageOnPeer/${props.id}`,
      body: props.data,
      headers:{
          "Authorization":Cookies.get("token")
      }
    });
  }