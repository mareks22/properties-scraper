export function getSellListings() {
  return fetch("http://localhost:8000/listings/sale");
}

export function getRentListings() {
  return fetch("http://localhost:8000/listings/rent");
}
