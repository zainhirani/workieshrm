import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
  } from "react-query";
  import * as api from "./api";
  import { PeerToPeer } from "./types";
  
  const KEY = "PeerToPeer";
  
  export function getKeyFromProps(
    props: any,
    type: "LISTING" | "DETAIL",
  ): string[] {
    const key = [KEY, type];
    key.push(props);
    return key;
  }
  
  //Listing
  export function usePeerToPeerListing(
    props: PeerToPeer.ListingProps,
  ): UseQueryResult<PeerToPeer.ListingResponse> {
    return useQuery(getKeyFromProps(props, "LISTING"), () => api.listing(props));
  }
  