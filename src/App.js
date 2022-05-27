import './App.css';

import React, {useCallback, useEffect, useState} from 'react';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

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
    setIsLoading(false);
    setPageCount(Math.ceil((response.data ? response.data.total : 0) / itemsPerPage));
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
    <div className="App">
      <br></br>
      <h1 style={{cursor: 'pointer'}} onClick={reset}>
        top90
      </h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            margin: '0 auto',
            width: '500px',
          }}
          className="form-group"
        >
          <input
            className="form-control"
            placeholder="Search player, team, etc."
            value={searchInput}
            onInput={(e) => setSearchInput(e.target.value)}
          />
          <button
            style={{visibility: 'hidden'}}
            className="btn btn-primary"
            id="searchButton"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div>
        {getVideoUrlsResponse?.data?.goals?.map((video, i) => (
          <div key={video.RedditPostTitle}>
            <h4>{video.RedditPostTitle}</h4>
            <div>
              <video controls controlsList="download" muted={true} style={{width: '70%'}}>
                <source src={video.PresignedUrl} type="video/mp4"></source>
              </video>
            </div>
            <br></br>
          </div>
        ))}
      </div>
      <div>{isLoading && <div>Loading...</div>}</div>
      <div className="fixed-bottom d-flex justify-content-center">
        <div className="Paginate">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
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
    </div>
  );
}

export default App;
