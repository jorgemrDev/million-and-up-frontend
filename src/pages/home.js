import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import { API_URL } from "../utils/constants";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import PorpertiesCatalog from "../components/PorpertiesCatalog";
import Pagination from "../components/Pagination";

const emptyFilters = {
  page: 1,
  SearchKeyWord: "",
  priceFrom: 0,
  priceTo: 0,
  yearFrom: 0,
  yearTo: 0,
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

export default function Home() {
  const [searchFilters, setSearchFilters] = useState(emptyFilters);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);
  const [listP, setList] = useState({});
  const [page, setPage] = useState(1);

  const errors = getErrors(searchFilters);
  const isValid = Object.keys(errors).length === 0;
  function getErrors(searchFilters) {
    const result = {};
    if (
      !searchFilters.SearchKeyWord &&
      !searchFilters.priceFrom &&
      !searchFilters.priceTo &&
      !searchFilters.yearFrom &&
      !searchFilters.yearTo
    ) {
      result.SearchKeyWord = "Select Any Filter";
    }

    if (searchFilters.priceFrom > searchFilters.priceTo)
      result.priceTo = "Price To cant be less than Price From";
    if (searchFilters.yearFrom > searchFilters.yearFrom)
      result.yearTo = "Year To cant be less than Year From";

    return result;
  }

  function handleChange(e) {
    e.persist(); // persist the event
    setSearchFilters((curFilters) => {
      return {
        ...curFilters,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  useEffect(() => {
    (async () => {
      setStatus(STATUS.SUBMITTING);
      if (isValid) {
        const response = await fetch(
          `${API_URL}Property?PageSize=10&TotalPages=10&TotalCount=1&PageNumber=1&SearchKeyWord=${searchFilters.SearchKeyWord}&PriceFrom=${searchFilters.priceFrom}&PriceTo=${searchFilters.priceTo}&YearFrom=${searchFilters.yearFrom}&YearTo=${searchFilters.yearTo}&CurrentPage=${page}`
        );

        const result = await response.json();
        setList(result);
        setStatus(STATUS.COMPLETED);
      } else {
        setStatus(STATUS.SUBMITTED);
      }
    })();
  }, [searchFilters]);

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>Properties</h1>

        {!isValid && status === STATUS.SUBMITTED && (
          <div role="alert">
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="SearchKeyWord">Search</label>
          <br />
          <input
            id="SearchKeyWord"
            type="text"
            value={searchFilters.SearchKeyWord}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.SearchKeyWord || status === STATUS.SUBMITTED) &&
              errors.SearchKeyWord}
          </p>
        </div>

        <div>
          <div>
            <label htmlFor="priceFrom">Price From</label>
            <br />
            <select
              id="priceFrom"
              value={searchFilters.priceFrom}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="0">Select Price From</option>
              <option value="10000">10000</option>
              <option value="500000">500000</option>
              <option value="1000000">1000000</option>
              <option value="2000000">2000000</option>
            </select>
          </div>
          <div>
            <label htmlFor="priceTo">Price To</label>
            <br />
            <select
              id="priceTo"
              value={searchFilters.priceTo}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="0">Select Price To</option>
              <option value="10000">10000</option>
              <option value="500000">500000</option>
              <option value="1000000">1000000</option>
              <option value="2000000">2000000</option>
            </select>
            <p role="alert">
              {(touched.priceTo || status === STATUS.SUBMITTED) &&
                errors.priceTo}
            </p>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="yearFrom">Year From</label>
            <br />
            <select
              id="yearFrom"
              value={searchFilters.yearFrom}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="0">Select Year From</option>
              <option value="1980">1980</option>
              <option value="1990">1990</option>
              <option value="2000">2000</option>
              <option value="2010">2010</option>
            </select>
          </div>
          <div>
            <label htmlFor="yearFrom">Year To</label>
            <br />
            <select
              id="yearTo"
              value={searchFilters.yearTo}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="0">Select Year To</option>
              <option value="1980">1980</option>
              <option value="1990">1990</option>
              <option value="2000">2000</option>
              <option value="2010">2010</option>
            </select>
            <p role="alert">
              {(touched.yearTo || status === STATUS.SUBMITTED) && errors.yearTo}
            </p>
          </div>
        </div>
      </Col>

      {listP.Properties ? (
        <>
          <Row span="24">
            <PorpertiesCatalog properties={listP} />
          </Row>
          <Row span="24">
            <Pagination
              currentPage={listP.SearchParameters.CurrentPage}
              totalItems={listP.SearchParametersTotalCount}
              onChangePage={onChangePage}
            />
          </Row>
        </>
      ) : status === STATUS.SUBMITTING ? (
        <Col span={24}>
          <Loading></Loading>
        </Col>
      ) : (
        ""
      )}

      <Col span={24}>
        <Footer></Footer>
      </Col>
    </Row>
  );
}
