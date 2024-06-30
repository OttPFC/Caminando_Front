import { Image } from "./image";
import { ISuggestItinerary } from "./suggest-itinerary";

export interface ItineraryComponent {
    id : number;
    title:string;
    description:string;
    image:Image;
    suggestItinerary: ISuggestItinerary
}
