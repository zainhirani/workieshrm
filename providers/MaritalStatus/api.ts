import service from "services";
import { MaritalStatus } from "./types";

//GET Listing

export async function listing(
  props?: MaritalStatus.ListingAPIPayload,
): Promise<MaritalStatus.ListingResponse> {
  return service({
    method: "GET",
    url: `/MartialStatus/GetMartialStatusListing`,
    queryParams: props,
  });
}