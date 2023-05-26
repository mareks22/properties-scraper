import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import RentListings from "./pages/RentListings";
import SellListings from "./pages/SellListings";

import { useEffect, useState } from "react";
import { ListingsContext } from "./context/ListingsContext";
import { getSellListings, getRentListings } from "./service/api";
import { Listing } from "./model";
import Paginator from "./components/Paginatior";

function App() {
  const [allPropertiesToSell, setAllPropertiesToSell] = useState<Listing[]>([]);
  const [allPropertiesToRent, setAllPropertiesToRent] = useState<Listing[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items to display per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const propertiesToSell = allPropertiesToSell.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const propertiesToRent = allPropertiesToRent.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    getSellListings()
      .then((res) => res.json())
      .then((data: Listing[]) => setAllPropertiesToSell(data));

    getRentListings()
      .then((res) => res.json())
      .then((data: Listing[]) => setAllPropertiesToRent(data));
  }, []);

  return (
    <>
      <ListingsContext.Provider value={{ propertiesToSell, propertiesToRent }}>
        <Header />
        <Routes>
          <Route path="/" element={<RentListings />}></Route>
          <Route path="/sell" element={<SellListings />}></Route>
        </Routes>
        <Paginator
          itemsPerPage={itemsPerPage}
          totalItems={allPropertiesToSell.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </ListingsContext.Provider>
    </>
  );
}

export default App;
