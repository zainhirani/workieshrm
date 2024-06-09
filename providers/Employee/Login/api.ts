import service from "services";
import { Login } from "./types";

// Create
export async function create(
  props: Login.CreateAPIPayload,
): Promise<Login.CreateResponse> {
  return service({
    method: "POST",
    // formData: true,
    url: `/Employee/LoginEmployee`,
    body: props.data,
    // headers: {
    //   "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNTJlMzJjLTdjYjQtNGQxMS04ODcyLTA1Mjg5MTQyOGQ4YyIsImlhdCI6MTcwNTcxNjg3OSwiZXhwIjoxNzA2MTQ4ODc5fQ.0DAeHHntzqNnNQmEJxMwoLUH9G0SIFA2LCOEMZhBqtY",
    // }
  });
}