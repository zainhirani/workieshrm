import service from "services";
import { Designation } from "./types";

//GET Listing

export async function listing(
  props?: Designation.ListingAPIPayload,
): Promise<Designation.ListingResponse> {
  return service({
    method: "GET",
    url: `/Designation/GetDesignationListing`,
    queryParams: props,
  });
}