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
  const [lastPageToShow, setLastPageToShow] = useState(6)

  useEffect(() => {
    setPageNumbers(allPageNumbers.slice(0, 6));
  }, [allPageNumbers]);

  function calcPagesToShow(clicked: number) {
    // console.log("current", clicked);
    // console.log("pageNumbers[9]", pageNumbers[9]);
    if (clicked === pageNumbers[5]) {
      setLastPageToShow(pageNumbers[5])
      // console.log("entered if");

      console.log(
        "pageNumbers.indexOf(lastPageToShow):",
        pageNumbers.indexOf(lastPageToShow)
      );
      console.log(
        "pageNumbers.indexOf(lastPageToShow + 3):",
        pageNumbers.indexOf(lastPageToShow + 3)
      );
      const pagesToAdd = [
        ...allPageNumbers.slice(
          allPageNumbers.indexOf(lastPageToShow),
          allPageNumbers.indexOf(lastPageToShow + 3)
        ),
      ];

      console.log('pagesToAdd:', pagesToAdd)
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

  //calcPagesToShow();

  return (
    <nav className="wrapper">
      <button
        disabled={props.currentPage == 1}
        onClick={() => props.onPageChange(props.currentPage - 1)}
        className="paginator-buttons"
      >
        {"<"}{" "}
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
        onClick={() => props.onPageChange(props.currentPage + 1)}
        className="paginator-buttons"
      >
        {">"}{" "}
      </button>
    </nav>
  );
}
