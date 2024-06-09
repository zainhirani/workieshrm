import service from "services";
import { VerifyEmail } from "./types";

// Create
export async function create(
  props: VerifyEmail.CreateAPIPayload,
): Promise<VerifyEmail.CreateResponse> {
  return service({
    method: "POST",
    url: `/CompanyDetail/VerifyEmail`,
    body: props.data,
    headers: {
      "Authorization":localStorage.getItem("companyToken"),
    }
  });
}