import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Leave } from "./types";
  
  const KEY = "Leave";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useLeaveToApproveListing(
    props: Leave.ListingProps,
  ): UseQueryResult<Leave.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }

  //Requested Leave Listing
  export function useRequestLeave(
    props: Leave.LeaveRequestedListingProps,
  ): UseQueryResult<Leave.LeaveRequestedListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.requestedLeaveListing(props));
  }

   //Apply
   export function useApplyLeave(
    props: Leave.CreateProps = {},
  ): UseMutationResult<
    Leave.CreateResponse,
    {
      message?: string;
    },
    Leave.CreateMutationPayload
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
 
  // Reject
  export function useRejectLeave(props: Leave.RejectProps): UseMutationResult<
    Leave.RejectResponse,
    {
      message?: string;
    },
    Leave.RejectMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.reject({ ...props, data: payload }), {
      mutationKey: `${KEY}|Update`,
      onSuccess: () => {
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }

  // Approve
  export function useApproveLeave(props: Leave.ApproveProps): UseMutationResult<
    Leave.ApproveResponse,
    {
      message?: string;
    },
    Leave.ApproveMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.approve({ ...props, data: payload }), {
      mutationKey: `${KEY}|Update`,
      onSuccess: () => {
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }