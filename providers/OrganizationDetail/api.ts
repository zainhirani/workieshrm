import service from "services";
import { OrganizationDetail } from "./types";
import Cookies from "js-cookie";

// Create
export async function create(
  props: OrganizationDetail.CreateAPIPayload,
): Promise<OrganizationDetail.CreateResponse> {
  console.log(props.data,'propsssss')
  return service({
    formData: true,
    method: "POST",
    url: `/OrganizationDetail/CreateOrganizationDetail`,
    //@ts-ignore
    body: props.data,
    headers: {
      "Authorization":Cookies.get("token"),
    }
  });
}