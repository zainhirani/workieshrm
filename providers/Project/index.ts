import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Project } from "./types";
  
  const KEY = "Project";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useProjectListing(
    props: Project.ListingProps,
  ): UseQueryResult<Project.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCreateProject(
    props: Project.CreateProps = {},
  ): UseMutationResult<
    Project.CreateResponse,
    {
      message?: string;
    },
    Project.CreateMutationPayload
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
  
  //Detail
  export function useProjectDetail(
    props: Project.DetailProps,
  ): UseQueryResult<Project.DetailResponse> {
    return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
  }
  
  