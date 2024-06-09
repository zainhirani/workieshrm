import service from "services";
import { Documents } from "./types";
import Cookies from "js-cookie";

// Create
export async function create(
  props: Documents.CreateAPIPayload,
): Promise<Documents.CreateResponse> {
  return service({
    formData:true,
    method: "POST",
    url: `/EmployeeDocument/CreateEmployeeDocumentbytoken`,
    body: props.data,
    headers:{
      "Authorization":Cookies.get("EmployeeToken")
    }
  });
}