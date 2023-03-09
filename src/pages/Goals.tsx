import _logo from '../assets/top90logo.png';
import Select from '../components/Select';
import Input from '../components/Input';
import Video from '../components/Video';
import {Pagination} from '../api/core';
import {getGoals as _getGoals, GetGoalsFilter, GoalsResponse} from '../api/goals';
import {getTeams as _getTeams, TeamsResponse} from '../api/teams';

import ReactPaginate from 'react-paginate';
import React, {useEffect, useCallback, useState, FormEvent} from 'react';

const maxWidthContainer = {
  maxWidth: '800px',
  width: '100%',
};

const logo = {
  height: 250,
  cursor: 'pointer',
};

const form = {
  width: '100%',
};

const defaultPagination: Pagination = {skip: 0, limit: 5};

function Goals() {
  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedLeagueId, setSelectedLeagueId] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [selectedSeason, setSelectedSeason] = useState<number>();
  const [searchInput, setSearchInput] = useState('');

  const [getGoalsResponse, setGetGoalsResponse] = useState<GoalsResponse>();
  const [getTeamsResponse, setGetTeamsResponse] = useState<TeamsResponse>();

  const getGoals = useCallback(_getGoals, []);
  const getTeams = useCallback(_getTeams, []);

  const pageCount = Math.ceil(
    (getGoalsResponse ? getGoalsResponse.total : 0) / (pagination.limit || defaultPagination.limit)
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

  function handlePageClick(selectedItem: {selected: number}) {
    window.stop();
    const newOffset = selectedItem.selected * pagination.limit;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      season: selectedSeason,
      teamId: selectedTeamId,
    };
    setGetGoalsResponse(undefined);
    getGoals({...pagination, skip: newOffset}, getGoalsFilter).then((data) =>
      setGetGoalsResponse(data)
    );

    setCurrentPage(selectedItem.selected);
    setPagination({...pagination, skip: newOffset});
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      season: selectedSeason,
      teamId: selectedTeamId,
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));

    setCurrentPage(0);
    setPagination(defaultPagination);
  }

  function handleSelectedLeagueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLeagueId = event.target.value;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: parseInt(selectedLeagueId),
      season: selectedSeason,
      teamId: 0,
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));
    getTeams(parseInt(selectedLeagueId), selectedSeason).then((data) => setGetTeamsResponse(data));

    setSelectedLeagueId(parseInt(selectedLeagueId));
    setSelectedTeamId(0);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedTeamChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTeamId = event.target.value;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      season: selectedSeason,
      teamId: parseInt(selectedTeamId),
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));

    setSelectedTeamId(parseInt(selectedTeamId));
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedSeasonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSeason = event.target.value;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      season: parseInt(selectedSeason),
      teamId: selectedTeamId,
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));

    setSelectedSeason(parseInt(selectedSeason));
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function reset() {
    setGetGoalsResponse(undefined);
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
      <div style={maxWidthContainer}>
        <div className="d-flex justify-content-center">
          <img style={logo} src={_logo} onClick={reset} alt="logo" />
        </div>

        <form style={form} onSubmit={handleSubmit}>
          <div className="d-flex">
            <Select
              label={'League'}
              options={[
                {value: 39, displayName: 'Premier League'},
                {value: 2, displayName: 'Champions League'},
                {value: 1, displayName: 'World Cup'},
              ]}
              value={selectedLeagueId}
              onChange={handleSelectedLeagueChange}
            ></Select>
            <Select
              label={'Team'}
              options={
                getTeamsResponse &&
                getTeamsResponse.teams &&
                getTeamsResponse.teams.map((team) => ({
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

        {getGoalsResponse?.goals?.map((goal) => (
          <div key={goal.Id} className="mb-4">
            <Video goal={goal}></Video>
          </div>
        ))}

        <br></br>
        <br></br>

        <div className="fixed-bottom d-flex justify-content-center">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            forcePage={currentPage}
            nextLabel=">"
            nextLinkClassName="page-link"
            previousLabel="<"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            breakClassName="page-item"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;
