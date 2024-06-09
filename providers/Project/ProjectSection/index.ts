import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { ProjectSection } from "./types";
  
  const KEY = "ProjectSection";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useProjectSectionListing(
    props: ProjectSection.ListingProps,
  ): UseQueryResult<ProjectSection.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCreateProjectSection(
    props: ProjectSection.CreateProps,
  ): UseMutationResult<
    ProjectSection.CreateResponse,
    {
      message?: string;
    },
    ProjectSection.CreateMutationPayload
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
export function useProjectSectionDetail(
  props: ProjectSection.DetailProps,
): UseQueryResult<ProjectSection.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}
  
  // Update
  export function useProjectSectionUpdate(props: ProjectSection.UpdateProps): UseMutationResult<
    ProjectSection.UpdateResponse,
    {
      message?: string;
    },
    ProjectSection.UpdateMutationPayload
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
  export function useProjectSectionRemove(props?: ProjectSection.RemoveProps): UseMutationResult<
    ProjectSection.RemoveResponse,
    {
      message?: string;
    },
    ProjectSection.RemoveMutationPayload
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
  