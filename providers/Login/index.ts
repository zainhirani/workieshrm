import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Login } from "./types";
  
  const KEY = "Login";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }

   //Listing
   export function useMe(
    props: Login.ListingProps,
  ): UseQueryResult<Login.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  
  //Create
  export function useCeoLogin(
    props: Login.CreateProps = {},
  ): UseMutationResult<
    Login.CreateResponse,
    {
      message?: string;
    },
    Login.CreateMutationPayload
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

    //Create
    export function useMainLogin(
      props: Login.MainLoginProps = {},
    ): UseMutationResult<
      Login.MainLoginResponse,
      {
        message?: string;
      },
      Login.MainLoginMutationPayload
    > {
      const queryClient = useQueryClient();
      return useMutation((payload) => api.loginMain({ ...props, data: payload }), {
        mutationKey: `${KEY} | Create`,
        onSuccess: () => {
          console.log(getKeyFromProps(props, "LISTING"));
          queryClient.invalidateQueries([KEY]);
        },
        retry: 0,
      });
    }  