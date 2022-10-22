import '../App.css';
import logo from '../assets/top90logo.png';
import Select from '../components/Select';
import Input from '../components/Input';
import GoalsList from '../components/GoalsList';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import React, {useEffect, useCallback, useState} from 'react';

function Goals() {
  const defaultPagination = {skip: 0, limit: 3};
  const baseUrl = process.env.REACT_APP_TOP90_API_BASE_URL || 'https://api.top90.io';

  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedLeagueId, setSelectedLeagueId] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [selectedSeason, setSelectedSeason] = useState();
  const [searchInput, setSearchInput] = useState('');

  const [getGoalsResponse, setGetGoalsResponse] = useState(null);
  const [getTeamsResponse, setGetTeamsResponse] = useState(null);

  const getGoals = useCallback(
    async (search = '', pagination = {skip: 0, limit: 3}, leagueId = 0, season = 0, teamId = 0) => {
      const url = `${baseUrl}/goals?skip=${pagination.skip}&limit=${pagination.limit}&search=${search}&leagueId=${leagueId}&season=${season}&teamId=${teamId}`;
      return await axios.get(url);
    },
    [baseUrl]
  );

  const getTeams = useCallback(
    async (leagueId = 0, season = 0) => {
      const url = `${baseUrl}/teams?leagueId=${leagueId}&season=${season}`;
      return await axios.get(url);
    },
    [baseUrl]
  );

  const pageCount = Math.ceil(
    (getGoalsResponse?.data ? getGoalsResponse.data.total : 0) / pagination.limit
  );

  useEffect(() => {
    let isMounted = true;
    getGoals().then((data) => {
      if (isMounted) setGetGoalsResponse(data);
    });
    getTeams().then((data) => {
      if (isMounted) setGetTeamsResponse(data);
    });
    return () => {
      isMounted = false;
    };
  }, [getGoals, getTeams]);

  function handlePageClick(event) {
    const newOffset = event.selected * pagination.limit;
    setCurrentPage(event.selected);
    getGoals(
      searchInput,
      {...pagination, skip: newOffset},
      selectedLeagueId,
      selectedSeason,
      selectedTeamId
    ).then((data) => setGetGoalsResponse(data));
    setPagination({...pagination, skip: newOffset});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCurrentPage(0);
    getGoals(searchInput, defaultPagination, selectedLeagueId, selectedSeason, selectedTeamId).then(
      (data) => setGetGoalsResponse(data)
    );
    setPagination(defaultPagination);
  }

  function handleSelectedLeagueChange(event) {
    const selectedLeagueId = event.target.value;
    getGoals(searchInput, defaultPagination, selectedLeagueId, selectedSeason, 0).then((data) =>
      setGetGoalsResponse(data)
    );
    getTeams(selectedLeagueId, selectedSeason).then((data) => setGetTeamsResponse(data));

    setSelectedLeagueId(selectedLeagueId);
    setSelectedTeamId(0);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedTeamChange(event) {
    const selectedTeamId = event.target.value;
    getGoals(searchInput, defaultPagination, selectedLeagueId, selectedSeason, selectedTeamId).then(
      (data) => setGetGoalsResponse(data)
    );

    setSelectedTeamId(selectedTeamId);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedSeasonChange(event) {
    const selectedSeason = event.target.value;
    getGoals(searchInput, defaultPagination, selectedLeagueId, selectedSeason, selectedTeamId).then(
      (data) => setGetGoalsResponse(data)
    );

    setSelectedSeason(selectedSeason);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function reset() {
    getGoals().then((data) => setGetGoalsResponse(data));
    getTeams().then((data) => setGetTeamsResponse(data));

    setSelectedLeagueId(0);
    setSelectedTeamId(0);
    setSelectedSeason(0);
    setSearchInput('');
    setCurrentPage(0);
    setPagination(defaultPagination);
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="main-container">
        <div className="d-flex justify-content-center">
          <img style={{height: 250, cursor: 'pointer'}} src={logo} onClick={reset} alt="logo" />
        </div>

        <form style={{width: '100%'}} onSubmit={handleSubmit}>
          <div className="d-flex">
            <Select
              label={'League'}
              options={[{value: 39, displayName: 'Premier League'}]}
              value={selectedLeagueId}
              onChange={handleSelectedLeagueChange}
            ></Select>
            <Select
              label={'Team'}
              options={
                getTeamsResponse &&
                getTeamsResponse.data &&
                getTeamsResponse.data.teams &&
                getTeamsResponse.data.teams.map((team) => ({
                  value: team.Id,
                  displayName: team.Name,
                }))
              }
              value={selectedTeamId}
              onChange={handleSelectedTeamChange}
            ></Select>
            <Select
              label={'Season'}
              options={[
                {value: '2022', displayName: '2022'},
                {value: '2021', displayName: '2021'},
              ]}
              value={selectedSeason}
              onChange={handleSelectedSeasonChange}
            ></Select>
          </div>

          <br></br>

          <Input
            label={'Keyword Search'}
            placeholder={'Search player, manager, etc.'}
            value={searchInput}
            onInput={setSearchInput}
          ></Input>

          <button
            style={{display: 'none'}}
            className="btn btn-primary"
            id="searchButton"
            type="submit"
          />
          <br></br>
        </form>

        <GoalsList goals={getGoalsResponse?.data?.goals || []}></GoalsList>

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
      </div>
    </div>
  );
}

export default Goals;
