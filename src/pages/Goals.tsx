import 'bootstrap/js/dist/tab';
import {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import FixturesList from '../components/FixturesList';
import Header from '../components/Header';
import Input from '../components/Input';
import Select from '../components/Select';
import ThemeSelect from '../components/ThemeSelect';
import Video from '../components/Video';
import {Pagination} from '../lib/api/core';
import {getFixtures, GetFixturesResponse} from '../lib/api/fixtures';
import {getGoals, GetGoalsFilter, GetGoalsResponse} from '../lib/api/goals';
import {getLeagues, GetLeaguesResponse} from '../lib/api/leagues';
import {Player, searchPlayers, SearchPlayersResponse} from '../lib/api/players';
import {getTeams, GetTeamsResponse} from '../lib/api/teams';
import {getPreferredTheme, setTheme} from '../lib/utils';

const defaultPagination: Pagination = {skip: 0, limit: 5};

function Goals() {
  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>();
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [searchInput, setSearchInput] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(getPreferredTheme());
  const [getGoalsResponse, setGetGoalsResponse] = useState<GetGoalsResponse>();
  const [getTeamsResponse, setGetTeamsResponse] = useState<GetTeamsResponse>();
  const [getFixturesResponse, setGetFixturesResponse] = useState<GetFixturesResponse>();
  const [getLeaguesResponse, setGetLeaguesResponse] = useState<GetLeaguesResponse>();
  const [searchPlayesResponse, setSearchPlayersResponse] = useState<SearchPlayersResponse>();

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
  }, []);

  function handlePageClick(selectedItem: {selected: number}) {
    window.stop();
    const newOffset = selectedItem.selected * pagination.limit;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
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
      teamId: selectedTeamId,
      playerId: selectedPlayer?.id,
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
      teamId: selectedTeamId,
      playerId: selectedPlayer?.id,
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));

    setSelectedLeagueId(parseInt(selectedLeagueId));
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedTeamChange(value: string) {
    const selectedTeamId = value;
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      teamId: parseInt(selectedTeamId),
      playerId: selectedPlayer?.id,
    };
    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));

    setSelectedTeamId(parseInt(selectedTeamId));
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleSelectedPlayerChange(player: Player) {
    const getGoalsFilter: GetGoalsFilter = {
      searchTerm: searchInput,
      leagueId: selectedLeagueId,
      teamId: selectedTeamId,
      playerId: player.id,
    };

    setGetGoalsResponse(undefined);
    getGoals(defaultPagination, getGoalsFilter).then((data) => setGetGoalsResponse(data));
    setSelectedPlayer(player);
    setPagination(defaultPagination);
    setCurrentPage(0);
  }

  function handleTeamSearchInputChange(value: string) {
    getTeams({searchTerm: value}).then((data) => {
      setGetTeamsResponse(data);
    });
  }

  function handlePlayerSearchInputChange(value: string) {
    searchPlayers(value).then((data) => {
      setSearchPlayersResponse(data);
    });
  }

  function reset() {
    setGetGoalsResponse(undefined);
    getGoals().then((data) => setGetGoalsResponse(data));

    setSelectedLeagueId(undefined);
    setSelectedTeamId(undefined);
    setSelectedPlayer(undefined);
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
      <div className="top90-app-container">
        <Header selectedTheme={selectedTheme} onClick={reset}></Header>

        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              id="fixtures-tab"
              data-bs-toggle="tab"
              data-bs-target="#fixtures"
              type="button"
              aria-controls="fixtures"
              aria-selected="false"
            >
              Fixtures
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings"
              type="button"
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
                    {key: 1, value: 1, displayName: 'World Cup'},
                    {key: 2, value: 2, displayName: 'Champions League'},
                    {key: 3, value: 3, displayName: 'Europa League'},
                    {key: 39, value: 39, displayName: 'Premier League'},
                    {key: 253, value: 253, displayName: 'Major League Soccer'},
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
                      key: team.id,
                      value: team.id,
                      displayName: team.name,
                    }))
                  }
                  value={selectedTeamId}
                  onChange={handleSelectedTeamChange}
                  onSearchChange={handleTeamSearchInputChange}
                  onFirstInteraction={() => getTeams().then((data) => setGetTeamsResponse(data))}
                  showSearchInput
                ></Select>
                <Select
                  label={'Player'}
                  options={
                    searchPlayesResponse &&
                    searchPlayesResponse.players &&
                    searchPlayesResponse.players.map((player) => ({
                      key: player.id,
                      value: player,
                      displayName: player.name,
                    }))
                  }
                  value={selectedPlayer}
                  onChange={handleSelectedPlayerChange}
                  onSearchChange={handlePlayerSearchInputChange}
                  onFirstInteraction={() =>
                    searchPlayers('').then((data) => setSearchPlayersResponse(data))
                  }
                  showSearchInput
                ></Select>
              </div>

              <br />

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

              <br />
            </div>

            {getGoalsResponse?.goals?.map((goal) => (
              <div key={goal.id} className="mb-4">
                <Video goal={goal}></Video>
              </div>
            ))}

            <br />
            <br />

            <div className="fixed-bottom d-flex justify-content-center">
              <div className="pagination-container">
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
