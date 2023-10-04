import Select from '../components/Select';
import Input from '../components/Input';
import Video from '../components/Video';
import {Pagination} from '../lib/api/core';
import {getGoals as _getGoals, GetGoalsFilter, GoalsResponse} from '../lib/api/goals';
import {getTeams as _getTeams, TeamsResponse} from '../lib/api/teams';

import ReactPaginate from 'react-paginate';
import React, {useEffect, useCallback, useState, FormEvent} from 'react';
import ThemeSelect from '../components/ThemeSelect';
import {Header} from '../components/Header';
import {getPreferredTheme, setTheme} from '../lib/utils';

const maxWidthContainer = {
  maxWidth: '800px',
  width: '100%',
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

  const [selectedTheme, setSelectedTheme] = useState(getPreferredTheme());

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

  function handleSelectedLeagueChange(value: string) {
    const selectedLeagueId = value;
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

  function handleSelectedTeamChange(value: string) {
    const selectedTeamId = value;
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

  function handleSelectedSeasonChange(value: string) {
    const selectedSeason = value;
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

  function changeTheme(value: string) {
    const selectedTheme = value;
    localStorage.setItem('top90-theme', selectedTheme);
    setTheme(selectedTheme);
    setSelectedTheme(selectedTheme);
  }

  return (
    <div className="container d-flex justify-content-center">
      <div style={maxWidthContainer}>
        <Header selectedTheme={selectedTheme} onClick={reset}></Header>

        <form style={form} onSubmit={handleSubmit}>
          <div className="d-flex">
            <Select
              label={'League'}
              options={[
                {value: 1, displayName: 'World Cup'},
                {value: 2, displayName: 'Champions League'},
                {value: 3, displayName: 'Europa League'},
                {value: 39, displayName: 'Premier League'},
                {value: 253, displayName: 'Major League Soccer'},
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
                  value: team.id,
                  displayName: team.name,
                }))
              }
              value={selectedTeamId}
              onChange={handleSelectedTeamChange}
              showSearchInput
            ></Select>
            <Select
              label={'Season'}
              options={[
                {value: '2023', displayName: '2023'},
                {value: '2022', displayName: '2022'},
                {value: '2021', displayName: '2021'},
              ]}
              value={selectedSeason}
              onChange={handleSelectedSeasonChange}
            ></Select>
          </div>

          <br></br>

          <div className="d-flex">
            <div className="flex-grow-1" style={{flexBasis: '0'}}>
              <Input
                label={'Keyword Search'}
                placeholder={'Search anything'}
                value={searchInput}
                onInput={setSearchInput}
              ></Input>
            </div>

            <div className="flex-grow-1" style={{flexBasis: '0'}}>
              <ThemeSelect onChange={changeTheme}></ThemeSelect>
            </div>

            <button
              style={{display: 'none'}}
              className="btn btn-primary"
              id="searchButton"
              type="submit"
            />
          </div>

          <br></br>
        </form>

        {getGoalsResponse?.goals?.map((goal) => (
          <div key={goal.id} className="mb-4">
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
