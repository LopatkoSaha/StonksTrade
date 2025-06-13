import React, { useState } from "react";

import { PaginationController } from "../PaginationController/PaginationController";

type TProps<T extends Record<string, string | number| boolean>> = {
  data: T[];
  matcher: Record<keyof T, {title: string, isSort: boolean}>;
  renderLine: (item: T) => any;
};

export function TableCommon<T extends Record<string, string | number| boolean>>({ data, matcher, renderLine }: TProps<T>)  {

  type TSort = {
    field: keyof T;
    order: "asc" | "desc" | "";
  };

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [quantityRowsOnPage, setQuantityRowsOnPage] = useState<number>(5);
  const [sort, setSort] = useState<TSort>({field: Object.keys(matcher)[0], order: ""});

  let sortData = data && data.sort((a, b) => {
    if (typeof +a[sort.field] === "number" && typeof +b[sort.field] === "number") {
      return +a[sort.field] - +b[sort.field];
    }
    return a[sort.field].toString().localeCompare(b[sort.field].toString());
  });

  if (sortData && sort.order === "desc") {
    sortData = sortData.reverse();
  }

  const slicedData = sortData.slice(pageNumber * quantityRowsOnPage - quantityRowsOnPage, pageNumber * quantityRowsOnPage);

  function handlerPageNumber (numberPage: number) {
      setPageNumber(numberPage);
  };
  
  function handleQuantityRows (quantity: number) {
    setQuantityRowsOnPage(quantity);
  };

  const handleSort = (field: keyof T) => {
    setPageNumber(1);
    if(field === sort.field) {
      if(sort.order === "asc") {
        return setSort({field, order: "desc"});
      }
      if (sort.order === "desc") {
        return setSort({field, order: ""});
      }
    }
    return setSort({field, order: "asc"});
  };
  
  const paginationProps = {
    length: data?.length ?? null,
    currentPageNumber: pageNumber,
    quantityRowsOnPage: quantityRowsOnPage,
    handlerPageNumber,
    handleQuantityRows
  };

  return (
    <div className="container my-4">
      <div className="row fw-bold border-bottom py-2 text-start">
        {Object.keys(matcher).map((name, idx) => {
          const value = matcher[name];
          const isSorted = sort.field === name;
          const sortClass = isSorted ? (sort.order === "asc" ? "text-primary" : "text-warning") : "";

          return (
            <div
              key={idx}
              className={`col clickable ${sortClass}`}
              style={{ cursor: value.isSort ? 'pointer' : 'default' }}
              onClick={() => value.isSort && handleSort(name)}
            >
              {value.title}
            </div>
          );
        })}
        <div className="col"></div>
      </div>

      <div className="row">
        {slicedData.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderLine(item)}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-3">
        <PaginationController {...paginationProps} />
      </div>
    </div>
  );
}