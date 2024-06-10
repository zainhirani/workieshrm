import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { Attendance } from "./types";
  
  const KEY = "Attendance";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function useAttendanceListing(
    props: Attendance.ListingProps,
  ): UseQueryResult<Attendance.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }

  //Employee Time Listing
  export function useEmployeeTime(
    props: Attendance.EmployeeTimeListingProps,
  ): UseQueryResult<Attendance.EmployeeTimeListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.timeListing(props));
  }
  
  //Create
  export function useCreateAttendance(
    props: Attendance.CreateProps = {},
  ): UseMutationResult<
    Attendance.CreateResponse,
    {
      message?: string;
    },
    Attendance.CreateMutationPayload
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

  //Time In
  export function useTimeInAttendance(
    props: Attendance.CreateTimeInProps = {},
  ): UseMutationResult<
    Attendance.CreateTimeInResponse,
    {
      message?: string;
    },
    Attendance.CreateTimeInMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.createTimeIn({ ...props, data: payload }), {
      mutationKey: `${KEY} | Create`,
      onSuccess: () => {
        console.log(getKeyFromProps(props, "LISTING"));
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }
  
  //Time In
  export function useTimeOutAttendance(
    props: Attendance.CreateTimeOutProps = {},
  ): UseMutationResult<
    Attendance.CreateTimeOutResponse,
    {
      message?: string;
    },
    Attendance.CreateTimeOutMutationPayload
  > {
    const queryClient = useQueryClient();
    return useMutation((payload) => api.createTimeOut({ ...props, data: payload }), {
      mutationKey: `${KEY} | Create`,
      onSuccess: () => {
        console.log(getKeyFromProps(props, "LISTING"));
        queryClient.invalidateQueries([KEY]);
      },
      retry: 0,
    });
  }
  