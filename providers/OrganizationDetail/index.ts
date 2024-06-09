import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { OrganizationDetail } from "./types";
  
  const KEY = "OrganizationDetail";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Create
  export function useCreateOrganizationDetail(
  props: OrganizationDetail.CreateProps = {},
): UseMutationResult<
  OrganizationDetail.CreateResponse,
  { message?: string },
  OrganizationDetail.CreateMutationPayload
> {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload) => { 
      return api.create({ ...props, data: payload })},
    {
      mutationKey: `${KEY} | Create`,
      onSuccess: () => {
        console.log(getKeyFromProps(props, "LISTING"));
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    }
  );
}
 