import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { UserPeer } from "./types";
  
  const KEY = "UserPeer";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useUserPeerListing(
    props: UserPeer.ListingProps,
  ): UseQueryResult<UserPeer.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCreateUserPeer(
    props: UserPeer.CreateProps,
  ): UseMutationResult<
    UserPeer.CreateResponse,
    {
      message?: string;
    },
    UserPeer.CreateMutationPayload
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