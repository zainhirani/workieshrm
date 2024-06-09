import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Employee } from "./types";
  
  const KEY = "Employee";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }

    //Listing
    export function useEmployeeListing(
      props: Employee.ListingProps,
    ): UseQueryResult<Employee.ListingResponse> {
      return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
    }  
  
  //Create
  export function useCreateEmployee(
    props: Employee.CreateProps = {},
  ): UseMutationResult<
    Employee.CreateResponse,
    {
      message?: string;
    },
    Employee.CreateMutationPayload
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
export function useEmployeeDetail(
  props: Employee.DetailProps,
): UseQueryResult<Employee.DetailResponse> {
  return useQuery(getKeyFromProps(props, "DETAIL"), () => api.detail(props));
}