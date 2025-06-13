import { useState } from "react";
import { Link } from "react-router-dom";

import "./TableCouses.css";
import { useAppSelector } from "hooks/useAppSelector";

interface CoinIconsState {
  [key: string]: string;
}

type TCoursesState = {
    startCourses: Record<string, number>,
    currentCourses: Record<string, number>,
}

export const TableCourses = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const {currentCourses, startCourses} = useAppSelector(
    (state: { courses: TCoursesState }) => state.courses
  );
  const coinIcons = useAppSelector((state: { coinIcons: CoinIconsState }) => state.coinIcons);

  if (Object.entries(currentCourses).length > 0) {
    const sortedCurrentCourses = Object.entries(currentCourses)
    .sort(
      (a, b) => b[1] - a[1]
    ).map(([name, value]) => {
      const numericValue = Number(value).toFixed(2);
      return {
        name, 
        value: numericValue, 
        diff: 100*(+numericValue - startCourses[name])/startCourses[name]
      };
    });

    const currencys = showAllCourses
      ? sortedCurrentCourses
      : sortedCurrentCourses.slice(0, 3);

    const hendlshowCourses = () => {
      setShowAllCourses((prev) => !prev);
    };

    return (
      <div className="container my-4">
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-outline-primary" onClick={hendlshowCourses}>
            {!showAllCourses ? "Show all" : "Show top"}
          </button>
        </div>

        <div className="row g-4">
          {currencys.map(({ name, value, diff }) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={name}>
              <div className="card h-100 shadow-sm text-center">
                <div className="card-body">
                  <div className="mb-3">
                    <img
                      src={coinIcons[name]}
                      alt={name}
                      className="img-fluid"
                      style={{ width: "48px", height: "48px" }}
                    />
                  </div>
                  <h5 className="card-title text-capitalize">{name}</h5>
                  <p className="mb-1 text-muted">{value} USD</p>
                  <p
                    className={`fw-bold ${
                      diff >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {diff.toFixed(2)} %
                  </p>
                  <Link to={`/chart/${name}`} className="btn btn-sm btn-outline-secondary mt-2">
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="tableCouses">No courses</div>;
  }
};
