import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Meeting } from "./types";
  
  const KEY = "Meeting";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useMeetingListing(
    props: Meeting.ListingProps,
  ): UseQueryResult<Meeting.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCreateMeeting(
    props: Meeting.CreateProps,
  ): UseMutationResult<
    Meeting.CreateResponse,
    {
      message?: string;
    },
    Meeting.CreateMutationPayload
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

  //Join
export function useJoinMeeting(
  props: Meeting.DetailProps,
): UseQueryResult<Meeting.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}
  