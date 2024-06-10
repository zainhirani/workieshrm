import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { UserGroup } from "./types";
  
  const KEY = "UserGroup";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useUserGroupListing(
    props: UserGroup.ListingProps,
  ): UseQueryResult<UserGroup.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }

  //Create
  export function useCreateUserGroup(
    props: UserGroup.CreateProps,
  ): UseMutationResult<
    UserGroup.CreateResponse,
    {
      message?: string;
    },
    UserGroup.CreateMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.create({ ...props, data: payload }), {
      mutationKey: `${KEY} | Create`,
      onSuccess: () => {
        console.log(getKeyFromProps(props, "LISTING"));
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }
  