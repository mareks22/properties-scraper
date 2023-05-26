import { useContext } from "react";

import { Listing } from "../model";
import ListCard from "../components/ListCard";
import { ListingsContext } from "../context/ListingsContext";

function SellListings() {
  const listContext = useContext(ListingsContext);

  return (
    <>
      {listContext?.propertiesToSell.map((listing: Listing) => {
        return (
          <div className="listings" key={listing.id}>
            <ListCard listing={listing} />
          </div>
        );
      })}
    </>
  );
}

export default SellListings;
