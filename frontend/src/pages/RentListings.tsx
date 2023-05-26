import ListCard from "../components/ListCard";
import { ListingsContext } from "../context/ListingsContext";
import { useContext } from "react";
import { Listing } from "../model";

function RentListings() {
  const listContext = useContext(ListingsContext);

  return (
    <>
      {listContext?.propertiesToRent.map((listing: Listing) => {
        return (
          <div className="listings" key={listing.id}>
            <ListCard listing={listing} />
          </div>
        );
      })}
    </>
  );
}

export default RentListings;
