import service from "services";
import { Employee } from "./types";
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";

//GET Listing
export async function listing(
  props?: Employee.ListingAPIPayload,
): Promise<Employee.ListingResponse> {
  return service({
    method: "GET",
    url: `/Employee/GetEmployeeListing`,
    queryParams: props,
  });
}

// Create
export async function create(
  props: Employee.CreateAPIPayload,
): Promise<Employee.CreateResponse> {
  return service({
    method: "POST",
    formData: true,
    url: `/Employee/CreateEmployee`,
    body: props.data,
    headers: {
      "Authorization":Cookies.get("token"),
    }
  });
}

//Detail
export async function detail(
  props: Employee.DetailAPIPayload,
): Promise<Employee.DetailResponse> {
  return service({
    method: "GET",
    url: `/Employee/GetSingleEmployeeByID/${props._id}`,
  });
}