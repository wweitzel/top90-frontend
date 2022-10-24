import '../App.css';
import logo from '../assets/top90logo.png';
import Select from '../components/Select';
import Input from '../components/Input';
import {GoalsList} from '../components/GoalsList';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import React, {useEffect, useCallback, useState, FormEvent} from 'react';

export interface Goal {
  Id: string;
  RedditFullname: string;
  RedditLinkUrl: string;
  RedditPostTitle: string;
  RedditPostCreatedAt: Date;
  S3ObjectKey: string;
  PresignedUrl: string;
  CreatedAt: Date;
  FixtureId: number;
}

interface Team {
  Id: number;
  Name: string;
  Aliases?: string[];
  Code: string;
  Country: string;
  Founded: number;
  National: boolean;
  Logo: string;
  CreatedAt: Date;
}

interface GoalsResponse {
  goals: Goal[];
  total: number;
}

interface TeamsResponse {
  teams: Team[];
}

function Goals() {
  const defaultPagination = {skip: 0, limit: 3};
  const baseUrl = process.env.REACT_APP_TOP90_API_BASE_URL || 'https://api.top90.io';

  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedLeagueId, setSelectedLeagueId] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [selectedSeason, setSelectedSeason] = useState<number>();
  const [searchInput, setSearchInput] = useState('');

  const [getGoalsResponse, setGetGoalsResponse] = useState<GoalsResponse>();
  const [getTeamsResponse, setGetTeamsResponse] = useState<TeamsResponse>();

  const getGoals = useCallback(
    async (search = '', pagination = {skip: 0, limit: 3}, leagueId = 0, season = 0, teamId = 0) => {
      const response = await axios.get<GoalsResponse>(
        `${baseUrl}/goals?skip=${pagination.skip}&limit=${pagination.limit}&search=${search}&leagueId=${leagueId}&season=${season}&teamId=${teamId}`
      );
      return response.data;
    },
    [baseUrl]
  );

  const getTeams = useCallback(
    async (leagueId = 0, season = 0) => {
      const response = await axios.get<TeamsResponse>(
        `${baseUrl}/teams?leagueId=${leagueId}&season=${season}`
      );
      return response.data;
    },
    [baseUrl]
  );

  const pageCount = Math.ceil((getGoalsResponse ? getGoalsResponse.total : 0) / pagination.limit);

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
    const newOffset = selectedItem.selected * pagination.limit;
    setCurrentPage(selectedItem.selected);
    getGoals(
      searchInput,
      {...pagination, skip: newOffset},
      selectedLeagueId,
      selectedSeason,
      selectedTeamId
    ).then((data) => setGetGoalsResponse(data));
    setPagination({...pagination, skip: newOffset});
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setCurrentPage(0);
    getGoals(searchInput, defaultPagination, selectedLeagueId, selectedSeason, selectedTeamId).then(
      (data) => setGetGoalsResponse(data)
    );
    setPagination(defaultPagination);
  }

  function handleSelectedLeagueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLeagueId = event.target.value;
    getGoals(searchInput, defaultPagination, parseInt(selectedLeagueId), selectedSeason, 0).then(
      (data) => setGetGoalsResponse(data)
    );
    getTeams(parseInt(selectedLeagueId), selectedSeason).then((data) => setGetTeamsResponse(data));

    setSelectedLeagueId(parseInt(selectedLeagueId));
    setSelectedTeamId(0);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedTeamChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTeamId = event.target.value;
    getGoals(
      searchInput,
      defaultPagination,
      selectedLeagueId,
      selectedSeason,
      parseInt(selectedTeamId)
    ).then((data) => setGetGoalsResponse(data));

    setSelectedTeamId(parseInt(selectedTeamId));
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedSeasonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSeason = event.target.value;
    getGoals(
      searchInput,
      defaultPagination,
      selectedLeagueId,
      parseInt(selectedSeason),
      selectedTeamId
    ).then((data) => setGetGoalsResponse(data));

    setSelectedSeason(parseInt(selectedSeason));
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

        <GoalsList goals={getGoalsResponse?.goals}></GoalsList>

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
    </div>
  );
}

export default Goals;
