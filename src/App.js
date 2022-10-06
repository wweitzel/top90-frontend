import './App.css';

import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import logo from './assets/top90logo.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [getVideoUrlsResponse, setGetVideoUrlsResponse] = useState(null);

  const itemsPerPage = 3;
  const baseUrl = 'https://api.top90.io';

  const getGoals = useCallback(async (search = '', itemOffset = 0) => {
    const url = `${baseUrl}/goals?skip=${itemOffset}&limit=${itemsPerPage}&search=${search}`;
    let response = await axios.get(url);
    setGetVideoUrlsResponse(response);
    setPageCount(Math.ceil((response.data ? response.data.total : 0) / itemsPerPage));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getGoals();
  }, [getGoals]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setCurrentPage(event.selected);
    getGoals(searchInput, newOffset);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    getGoals(searchInput, 0);
  };

  const reset = () => {
    setSearchInput('');
    setCurrentPage(0);
    getGoals('', 0);
  };

  return (
    <div className="container">
      <img
        style={{ height: 250, cursor: 'pointer' }}
        src={logo} onClick={reset}
        alt="logo" />

      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <input
          style={{ borderRadius: '20px' }}
          className="form-control"
          placeholder="Search player, team, etc."
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
        />
        <button
          style={{ visibility: 'hidden' }}
          className="btn btn-primary"
          id="searchButton"
          type="submit"
        />
      </form>

      {getVideoUrlsResponse?.data?.goals?.map((video, i) => (
        <div style={{ width: '100%', marginBottom: '20px', }}
          key={video.RedditPostTitle}>
          <h6 style={{ textAlign: 'left' }}>{video.RedditPostTitle}</h6>
          <video width={'100%'} controls controlsList="download" muted={true}>
            <source src={video.PresignedUrl + "#t=0.1"} type="video/mp4"></source>
          </video>
        </div>
      ))}

      <div>{isLoading && <div>Loading...</div>}</div>
      <br></br>
      <br></br>
      <br></br>

      <div className="fixed-bottom d-flex justify-content-center" style={{ width: '100%' }}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          forcePage={currentPage}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="pagination-back-button"
          previousLinkClassName="page-link"
          nextClassName="pagination-next-button"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default App;
