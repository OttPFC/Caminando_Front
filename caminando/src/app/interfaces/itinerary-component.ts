export interface ItineraryComponent {
    title:string;
    description:string;
    image:string;
    suggestItinerary: ISuggestedItinerary
}
export interface ISuggestedItinerary {
    name:string;
    description:string;
    location:string;
}