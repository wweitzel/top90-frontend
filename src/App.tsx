import './App.css';
import logo from './assets/top90logo.png';
import {Goal, useGetGoals} from './hooks/useGetGoals';

import React, {FormEvent, useState} from 'react';

import ReactPaginate from 'react-paginate';

function Feed({goals = []}: {goals?: Goal[]}) {
  return (
    <>
      {goals.map((goal, i) => (
        <div style={{width: '100%', marginBottom: '20px'}} key={goal.redditPostTitle}>
          <h6 style={{textAlign: 'left'}}>{goal.redditPostTitle}</h6>
          <video width={'100%'} controls controlsList="download" muted={true}>
            <source src={goal.presignedUrl + '#t=0.1'} type="video/mp4"></source>
          </video>
        </div>
      ))}
    </>
  );
}

function App() {
  const defaultPaginationOptions = {itemOffset: 0, itemsPerPage: 3};

  const [paginationOptions, setPagination] = useState(defaultPaginationOptions);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [tempSearchInput, setTempSearchInput] = useState('');

  const {isLoading, data: getGoalsResponse} = useGetGoals(paginationOptions, searchInput);

  const pageCount = Math.ceil(
    (getGoalsResponse ? getGoalsResponse.total : 0) / paginationOptions.itemsPerPage
  );
  const goals = getGoalsResponse?.goals;

  function handlePageClick(selectedItem: {selected: number}) {
    const newOffset = selectedItem.selected * paginationOptions.itemsPerPage;
    setCurrentPage(selectedItem.selected);
    setPagination({...paginationOptions, itemOffset: newOffset});
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSearchInput(tempSearchInput);
    setCurrentPage(0);
    setPagination(defaultPaginationOptions);
  }

  function reset() {
    setTempSearchInput('');
    setSearchInput('');
    setCurrentPage(0);
    setPagination(defaultPaginationOptions);
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
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTempSearchInput(e.target.value)}
        />
        <button
          style={{visibility: 'hidden'}}
          className="btn btn-primary"
          id="searchButton"
          type="submit"
        />
      </form>

      {isLoading && <div>Loading...</div>}

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
        />
      </div>
    </div>
  );
}

export default App;
