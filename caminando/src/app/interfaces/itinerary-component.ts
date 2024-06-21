export interface ItineraryComponent {
    title:string;
    description:string;
    image:ImagedItinerary;
    suggestItinerary: ISuggestedItinerary
}
export interface ISuggestedItinerary {
    name:string;
    description:string;
    location:string;
}

export interface ImagedItinerary {
    url: string;
    description: string;
}