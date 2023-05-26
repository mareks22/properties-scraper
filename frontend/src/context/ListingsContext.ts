import { createContext } from "react";
import { Listing } from "../model";

type ListingsContextType = {
    propertiesToSell : Listing[]
    propertiesToRent : Listing[]
}
export const ListingsContext = createContext<ListingsContextType | null>(null)