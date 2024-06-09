import service from "services";
import { OrganizationType } from "./types";

//GET Listing

export async function listing(
  props?: OrganizationType.ListingAPIPayload,
): Promise<OrganizationType.ListingResponse> {
  return service({
    method: "GET",
    url: `/OrganizationType/GetOrganizationTypeListing`,
    queryParams: props,
  });
}