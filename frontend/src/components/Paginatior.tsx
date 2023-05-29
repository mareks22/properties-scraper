import { useEffect, useMemo, useState } from "react";
import "./Paginator.scss";

type Props = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Paginator(props: Props) {
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

  useEffect(() => {
    setPageNumbers(allPageNumbers.slice(0, 4));
  }, [allPageNumbers]);

  function calcPagesToShow(clicked: number) {
    const lastPage = allPageNumbers[allPageNumbers.length - 1];

    if (clicked == 1) {
      setPageNumbers(allPageNumbers.slice(0, 4));
    }

    if (clicked === lastPage) {
      setPageNumbers([
        1,
        pageNumbers[3] - 2,
        pageNumbers[3] - 1,
        pageNumbers[3],
      ]);
    } else if (clicked === pageNumbers[3]) {
      setPageNumbers([
        1,
        pageNumbers[3] - 1,
        pageNumbers[3],
        pageNumbers[3] + 1,
      ]);
    }

    if (clicked === pageNumbers[1] && pageNumbers[1] !== 2) {
      setPageNumbers([
        1,
        pageNumbers[1] - 1,
        pageNumbers[1],
        pageNumbers[1] + 1,
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
