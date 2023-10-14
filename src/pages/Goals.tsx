import Select from '../components/Select';
import Input from '../components/Input';
import Video from '../components/Video';
import {Pagination} from '../lib/api/core';
import {getGoals as getGoals, GetGoalsFilter, GetGoalsResponse} from '../lib/api/goals';
import {getTeams as getTeams, GetTeamsResponse} from '../lib/api/teams';
import {getLeagues as getLeagues, GetLeaguesResponse} from '../lib/api/leagues';

import ReactPaginate from 'react-paginate';
import {useEffect, useState} from 'react';
import ThemeSelect from '../components/ThemeSelect';
import {Header} from '../components/Header';
import {getPreferredTheme, setTheme} from '../lib/utils';
import {getFixtures, GetFixturesResponse} from '../lib/api/fixtures';
import {FixturesList} from '../components/FixturesList';

const maxWidthContainer = {
  maxWidth: '800px',
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
  const [selectedTheme, setSelectedTheme] = useState(getPreferredTheme());

  const [getGoalsResponse, setGetGoalsResponse] = useState<GetGoalsResponse>();
  const [getTeamsResponse, setGetTeamsResponse] = useState<GetTeamsResponse>();
  const [getFixturesResponse, setGetFixturesResponse] = useState<GetFixturesResponse>();
  const [getLeaguesResponse, setGetLeaguesResponse] = useState<GetLeaguesResponse>();

  const pageCount = Math.ceil(
    (getGoalsResponse ? getGoalsResponse.total : 0) / (pagination.limit || defaultPagination.limit)
  );

  useEffect(() => {
    getFixtures({todayOnly: true}).then((data) => {
      setGetFixturesResponse(data);
    });
    getLeagues().then((data) => {
      setGetLeaguesResponse(data);
    });
    getGoals().then((data) => {
      setGetGoalsResponse(data);
    });
    getTeams().then((data) => {
      setGetTeamsResponse(data);
    });
  }, []);

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

  function handleSubmit() {
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

        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="fixtures-tab"
              data-bs-toggle="tab"
              data-bs-target="#fixtures"
              type="button"
              role="tab"
              aria-controls="fixtures"
              aria-selected="false"
            >
              Fixtures
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="mt-3">
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
                    onEnterKeyDown={handleSubmit}
                  ></Input>
                </div>
              </div>

              <br></br>
            </div>

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
          <div
            className="tab-pane fade"
            id="fixtures"
            role="tabpanel"
            aria-labelledby="fixtures-tab"
          >
            <div className="mb-4">
              <FixturesList
                fixtures={getFixturesResponse?.fixtures}
                leagues={getLeaguesResponse?.leagues}
              ></FixturesList>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="settings"
            role="tabpanel"
            aria-labelledby="settings-tab"
          >
            <div className="mt-3">
              <ThemeSelect onChange={changeTheme}></ThemeSelect>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals;
