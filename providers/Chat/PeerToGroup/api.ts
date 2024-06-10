import service from "services";
import { PeerToGroup } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: PeerToGroup.ListingAPIPayload,
): Promise<PeerToGroup.ListingResponse> {
  return service({
    method: "GET",
    url: `/Chat/UserGroupChatListing`,
    queryParams: props,
    headers:{
      "Authorization":Cookies.get("token")
  }
  });
}
