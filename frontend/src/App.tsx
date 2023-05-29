import "./App.css";
import "./spinner.css";
import Header from "./components/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import RentListings from "./pages/RentListings";
import SellListings from "./pages/SellListings";

import { useEffect, useState } from "react";
import { ListingsContext } from "./context/ListingsContext";
import { getSellListings, getRentListings } from "./service/api";
import { Listing } from "./model";
import Paginator from "./components/Paginatior";
import Loading from "./components/Loading";

function App() {
  const [allPropertiesToSell, setAllPropertiesToSell] = useState<Listing[]>([]);
  const [allPropertiesToRent, setAllPropertiesToRent] = useState<Listing[]>([]);

  const [isLoading, setIsLoading] = useState(true);

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    //first fetch at '/' makes sure the data is ready in database
    fetch("http://localhost:8000/")
      .then(() => {
        return Promise.all([getSellListings(), getRentListings()]);
      })
      .then(([sellResponse, rentResponse]) => {
        return Promise.all([sellResponse.json(), rentResponse.json()]);
      })
      .then(([sellData, rentData]) => {
        setIsLoading(false);
        setAllPropertiesToSell(sellData);
        setAllPropertiesToRent(rentData);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header isLoading={isLoading} />
      <ListingsContext.Provider value={{ propertiesToSell, propertiesToRent }}>
        {isLoading ? (
          <Loading />
        ) : propertiesToSell.length > 0 ? (
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/rent" />} />
              <Route path="/rent" element={<RentListings />} />
              <Route path="/sell" element={<SellListings />} />
            </Routes>

            <Paginator
              itemsPerPage={itemsPerPage}
              totalItems={allPropertiesToSell.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <p className="no-items">No properties to show</p>
        )}
      </ListingsContext.Provider>
    </>
  );
}

export default App;
