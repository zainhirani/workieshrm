import service from "services";
import { City } from "./types";

//GET Listing

export async function listing(
  props?: City.ListingAPIPayload,
): Promise<City.ListingResponse> {
  return service({
    method: "GET",
    url: `/City/GetCityListing`,
    queryParams: props,
  });
}