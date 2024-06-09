import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Task } from "./types";
  
  const KEY = "Task";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useTaskListing(
    props: Task.ListingProps,
  ): UseQueryResult<Task.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCreateTask(
    props: Task.CreateProps,
  ): UseMutationResult<
    Task.CreateResponse,
    {
      message?: string;
    },
    Task.CreateMutationPayload
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
  
  // //MyTask
 //Listing
 export function useMyTaskListing(
    props: Task.MyListingProps,
  ): UseQueryResult<Task.MyListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.taskListing(props));
  }

  //Detail
export function useTaskDetail(
  props: Task.DetailProps,
): UseQueryResult<Task.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}
  
  // Update
  export function useTaskUpdate(props: Task.UpdateProps): UseMutationResult<
    Task.UpdateResponse,
    {
      message?: string;
    },
    Task.UpdateMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.update({ ...props, data: payload }), {
      mutationKey: `${KEY}|Update`,
      onSuccess: () => {
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }
  
  // Remove
  export function useTaskRemove(props?: Task.RemoveProps): UseMutationResult<
    Task.RemoveResponse,
    {
      message?: string;
    },
    Task.RemoveMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.remove(payload), {
      mutationKey: `${KEY}|Remove`,
      onSuccess: () => {
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }
  