import service from "services";
import { CompanyDetail } from "./types";

//GET Listing

export async function listing(
  props?: CompanyDetail.ListingAPIPayload,
): Promise<CompanyDetail.ListingResponse> {
  return service({
    method: "GET",
    url: `/City/CityWithRespectToCountry`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: CompanyDetail.CreateAPIPayload,
): Promise<CompanyDetail.CreateResponse> {
  return service({
    method: "POST",
    url: `/CompanyDetail/CreateCompanyDetail`,
    body: props.data,
  });
}

// //Detail
// export async function detail(
//   props: Course.DetailAPIPayload,
// ): Promise<Course.DetailResponse> {
//   return service({
//     method: "GET",
//     url: `/courses/${props.id}`,
//   });
// }

// // Update
// export async function update(
//   props: Course.UpdateAPIPayload,
// ): Promise<Course.UpdateResponse> {
//   return service({
//     method: "PATCH",
//     url: `/courses/${props.id}`,
//     body: props.data,
//   });
// }

// // Remove
// export async function remove(
//   props: Course.RemoveAPIPayload,
// ): Promise<Course.RemoveResponse> {
//   return service({
//     method: "DELETE",
//     url: `/courses/${props.id}`,
//   });
// }

// // Duplicate
// export async function duplicate(
//   props: Course.DuplicateAPIPayload,
// ): Promise<Course.DuplicateResponse> {
//   return service({
//     method: "POST",
//     url: `/courses/${props.id}/duplicate`,
//   });
// }
