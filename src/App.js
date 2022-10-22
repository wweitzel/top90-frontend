import './App.css';
import logo from './assets/top90logo.png';
import useGetGoals from './hooks/useGetGoals';
import SingleGoal from './SingleGoal';

import React, {useState, memo} from 'react';

import ReactPaginate from 'react-paginate';

function Feed(props = {goals: []}) {
  return (
    <>
      {props.goals.map((video, i) => (
        <div style={{width: '100%', marginBottom: '20px'}} key={video.RedditPostTitle}>
          <h6 style={{textAlign: 'left'}}>{video.RedditPostTitle}</h6>
          <video width={'100%'} controls controlsList="download" muted={true}>
            <source src={video.PresignedUrl + '#t=0.1'} type="video/mp4"></source>
          </video>
        </div>
      ))}
    </>
  );
}

function App() {
  const defaultPagination = {itemOffset: 0, itemsPerPage: 3};

  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [tempSearchInput, setTempSearchInput] = useState('');

  const {isLoading, data: getGoalsResponse} = useGetGoals(pagination, searchInput);

  const pageCount = Math.ceil(
    (getGoalsResponse ? getGoalsResponse.total : 0) / pagination.itemsPerPage
  );
  const goals = getGoalsResponse?.goals || [];

  function handlePageClick(event) {
    const newOffset = event.selected * pagination.itemsPerPage;
    setCurrentPage(event.selected);
    setPagination({...pagination, itemOffset: newOffset});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchInput(tempSearchInput);
    setCurrentPage(0);
    setPagination(defaultPagination);
  }

  function reset() {
    setTempSearchInput('');
    setSearchInput('');
    setCurrentPage(0);
    setPagination(defaultPagination);
  }

  return (
    <div className="container">
      <img style={{height: 250, cursor: 'pointer'}} src={logo} onClick={reset} alt="logo" />

      <form style={{width: '100%'}} onSubmit={handleSubmit}>
        <input
          style={{borderRadius: '20px'}}
          className="form-control"
          placeholder="Search player, team, etc."
          value={tempSearchInput}
          onInput={(e) => setTempSearchInput(e.target.value)}
        />
        <button
          style={{visibility: 'hidden'}}
          className="btn btn-primary"
          id="searchButton"
          type="submit"
        />
      </form>

      {isLoading && <div>Loading...</div>}

      {window.location.pathname !== '/' ? (
        <SingleGoal />
      ) : (
        <>
          <Feed goals={goals}></Feed>

          <div className="fixed-bottom d-flex justify-content-center" style={{width: '100%'}}>
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
        </>
      )}
    </div>
  );
}

export default memo(App);
