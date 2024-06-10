import service from "services";
import { Login } from "./types";
import Cookies from "js-cookie";

//GET Month Listing
export async function listing(
  props?: Login.ListingAPIPayload,
): Promise<Login.ListingResponse> {
  return service({
    method: "GET",
    url: `/Employee/me`,
    queryParams: props,
    headers: {
      "Authorization":Cookies.get("token"),
    }
  });
}

// Create
export async function create(
  props: Login.CreateAPIPayload,
): Promise<Login.CreateResponse> {
  return service({
    method: "POST",
    // formData: true,
    url: `/Ceo/LoginCeo`,
    body: props.data,
    // headers: {
    //   "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNTJlMzJjLTdjYjQtNGQxMS04ODcyLTA1Mjg5MTQyOGQ4YyIsImlhdCI6MTcwNTcxNjg3OSwiZXhwIjoxNzA2MTQ4ODc5fQ.0DAeHHntzqNnNQmEJxMwoLUH9G0SIFA2LCOEMZhBqtY",
    // }
  });
}

// Main Login
export async function loginMain(
  props: Login.MainLoginAPIPayload,
): Promise<Login.MainLoginResponse> {
  return service({
    method: "POST",
    // formData: true,
    url: `/Employee/MainLogin`,
    body: props.data,
    // headers: {
    //   "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNTJlMzJjLTdjYjQtNGQxMS04ODcyLTA1Mjg5MTQyOGQ4YyIsImlhdCI6MTcwNTcxNjg3OSwiZXhwIjoxNzA2MTQ4ODc5fQ.0DAeHHntzqNnNQmEJxMwoLUH9G0SIFA2LCOEMZhBqtY",
    // }
  });
}