import { useState } from "react";

type TProps = {
    length: number | null,
    currentPageNumber: number,
    quantityRowsOnPage: number,
    handlerPageNumber: (numberPage: number) => void,
    handleQuantityRows: (quantity: number) => void,
}

export const PaginationController = ({length, currentPageNumber, quantityRowsOnPage, handlerPageNumber, handleQuantityRows}: TProps) => {

    const pageSizeAll = [5, 10, 20];

    const [page, setPage] = useState<number | null>(null);
    const [pageSize, setPageSize] = useState<number>(quantityRowsOnPage);

    const quantityPages = length ? Math.ceil(length/quantityRowsOnPage) : 1;

    function mappedData(quantityPages: number, currentPage: number): (number | null)[] {
        const result: (number | null)[] = [];
      
        for (let i = 1; i <= quantityPages; i++) {
          const isFirst = i === 1;
          const isLast = i === quantityPages;
          const isNearCurrent =
            i >= currentPage - 1 && i <= currentPage + 1;
      
          const isDotsLeft = i === currentPage - 2;
          const isDotsRight = i === currentPage + 2;
      
          if (isFirst || isLast || isNearCurrent) {
            result.push(i);
          } else if (isDotsLeft || isDotsRight) {
            result.push(null);
          }
        }
      
        return result.filter((item, idx, arr) => {
          return !(item === null && arr[idx - 1] === null);
        });
      };

    const mappedDataResult = mappedData(quantityPages, currentPageNumber);

    function handleChangePage (e: React.MouseEvent<HTMLElement>) {
        const clickIdx = (e.target as HTMLDivElement).dataset.idx;
        if (clickIdx && +clickIdx !== currentPageNumber) {
            handlerPageNumber(+clickIdx);
            setPage(null);
        };
    };

    function handleChangePageInput (e: React.ChangeEvent<HTMLInputElement>) {
        const pageNumber = e.target.value;
        if (+pageNumber === 0) return;
        if (length && +pageNumber > Math.ceil(length/quantityRowsOnPage)) return;
        setPage(+pageNumber);
        handlerPageNumber(+pageNumber);
    };

    function handlePageSizeChange (event: React.ChangeEvent<HTMLSelectElement>) {
        setPageSize(+event.target.value);
        handleQuantityRows(+event.target.value);
        handlerPageNumber(1);
    };

    function getRandomIntExcluding(min: number, max: number, exclude: number): number {
        if (max - min <= 0 || (max - min === 1 && (exclude === min || exclude === max))) {
          return exclude === min ? max : min;
        }
      
        let rand: number;
        do {
          rand = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (rand === exclude);

        return rand;
    };

    function setRandomPageNumber () {
        handlerPageNumber(getRandomIntExcluding(1, quantityPages, currentPageNumber));
        setPage(null);
    };

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 my-3" onClick={handleChangePage}>
            {/* Выбор размера страницы */}
            <div className="d-flex align-items-center gap-2">
                <label htmlFor="pagesizeDropdown" className="form-label mb-0">Показывать по:</label>
                <select
                id="pagesizeDropdown"
                className="form-select form-select-sm w-auto"
                value={pageSize}
                onChange={handlePageSizeChange}
                >
                {pageSizeAll.map((size) => (
                    <option key={size} value={size}>
                    {size}
                    </option>
                ))}
                </select>
            </div>

            {/* Кнопки страниц */}
            <div className="d-flex flex-wrap align-items-center gap-2">
                {mappedDataResult.length > 1 &&
                mappedDataResult.map((item, idx) => (
                    <div
                    key={idx}
                    data-idx={item && item}
                    className={`btn btn-sm ${item === currentPageNumber ? 'btn-primary' : 'btn-outline-secondary'}`}
                    >
                    {item ? item : "..."}
                    </div>
                ))}
            </div>

            {/* Ввод страницы вручную + Рандом */}
            {mappedDataResult.length > 1 && (
                <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Выбор страницы:</label>
                <input
                    type="number"
                    className="form-control form-control-sm w-auto"
                    min={1}
                    max={length ? Math.ceil(length / quantityRowsOnPage) : 1}
                    value={Number(page) ? Number(page) : ''}
                    onChange={handleChangePageInput}
                />
                <button className="btn btn-sm btn-warning" onClick={setRandomPageNumber}>
                    Рандом
                </button>
                </div>
            )}
        </div>
    )
}