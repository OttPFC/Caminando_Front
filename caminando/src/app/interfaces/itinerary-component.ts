export interface ItineraryComponent {
    id : number;
    title:string;
    description:string;
    image:ImagedItinerary;
    suggestItinerary: ISuggestedItinerary
}
export interface ISuggestedItinerary {
    id : number;
    name:string;
    description:string;
    location:string;
}

export interface ImagedItinerary {
    id : number;
    url: string;
    description: string;
}