export function getSellListings() {
  return fetch("http://localhost:8000/listings/sell");
}

export function getRentListings() {
  return fetch("http://localhost:8000/listings/rent");
}
