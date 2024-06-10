import service from "services";
import { PeerToPeer } from "./types";
import Cookies from "js-cookie";

//GET Listing

export async function listing(
  props?: PeerToPeer.ListingAPIPayload,
): Promise<PeerToPeer.ListingResponse> {
  return service({
    method: "GET",
    url: `/Chat/UserPeerToPeerChatListing`,
    queryParams: props,
  });
}
