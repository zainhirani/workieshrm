export namespace PeerToGroup {
    export type Item = {
        _id:string;
        Name:string;
        Description:string;
        ProjectGroupData:{_id:string;Name:string;Description:string;RecurringMeetingDay:string;}
        MessagingGroupIdGroupMessagesData:{_id:string;Type:string;
            ParticipantIdGroupMessageParticipant:{
                _id:string;
                Name:string;
                Image:string;
                DesignationData:{_id:string;Name:string}
            }
        }
    };
  
    //Listing
    export type ListingProps = {
    //   SearchBy?: string | null;
    //   Limit?: number | null;
    //   Page?: number;
    };
    export type ListingResponse = { data: {items:Item[]}; };
    export interface ListingAPIPayload extends ListingProps {}
  
}