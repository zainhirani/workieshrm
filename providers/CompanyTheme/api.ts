import service from "services";
import { CompanyTheme } from "./types";

//GET Listing

export async function listing(
  props?: CompanyTheme.ListingAPIPayload,
): Promise<CompanyTheme.ListingResponse> {
  return service({
    method: "GET",
    url: `/CompanyTheme/GetCompanyThemeListing`,
    queryParams: props,
  });
}