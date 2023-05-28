import { useEffect, useMemo, useState } from "react";
import "./Paginator.scss";

type Props = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Paginator(props: Props) {
  //let pageNumbers: number[] = [];
  const allPageNumbers = useMemo(() => {
    const numbers = [];
    for (
      let i = 1;
      i <= Math.ceil(props.totalItems / props.itemsPerPage);
      i++
    ) {
      numbers.push(i);
    }
    return numbers;
  }, [props.totalItems, props.itemsPerPage]);

  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [lastPageToShow, setLastPageToShow] = useState(6);

  useEffect(() => {
    setPageNumbers(allPageNumbers.slice(0, 6));
  }, [allPageNumbers]);

  function calcPagesToShow(clicked: number) {
    if (clicked === pageNumbers[5]) {
      setLastPageToShow(pageNumbers[5]);
      const pagesToAdd = [
        ...allPageNumbers.slice(
          allPageNumbers.indexOf(lastPageToShow),
          allPageNumbers.indexOf(lastPageToShow + 3)
        ),
      ];

      setPageNumbers([
        1,
        ...pageNumbers.slice(pageNumbers[3], pageNumbers[4]),
        ...pagesToAdd,
      ]);
    }
  }

  function handlePageClick(number: number) {
    props.onPageChange(number);
    calcPagesToShow(number);
  }

  function pageMoveWithArrow(up: boolean) {
    if (up) {
      const nextPage = props.currentPage + 1;
      props.onPageChange(nextPage);
      calcPagesToShow(nextPage);
    } else {
      const prevPage = props.currentPage - 1;
      props.onPageChange(prevPage);
      calcPagesToShow(prevPage);
    }
  }

  //calcPagesToShow();

  return (
    <nav className="wrapper">
      <button
        disabled={props.currentPage == 1}
        onClick={() => pageMoveWithArrow(false)}
        className="paginator-buttons"
      >
        {"<"}
      </button>
      <ul className="paginator-pages">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={
                "paginator-buttons " +
                (props.currentPage == number ? "active" : "")
              }
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={
          props.currentPage == allPageNumbers[allPageNumbers.length - 1]
        }
        onClick={() => pageMoveWithArrow(true)}
        className="paginator-buttons"
      >
        {">"}
      </button>
    </nav>
  );
}
