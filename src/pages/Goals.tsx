import 'bootstrap/js/dist/tab';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ReactPaginate from 'react-paginate';
import {useOutletContext} from 'react-router-dom';
import Input from '../components/Input';
import Select from '../components/Select';
import Video from '../components/Video';
import {Pagination} from '../lib/api/core';
import {getGoals, GetGoalsFilter, GetGoalsResponse} from '../lib/api/goals';
import {Player, searchPlayers, SearchPlayersResponse} from '../lib/api/players';
import {getTeams, GetTeamsResponse} from '../lib/api/teams';

const defaultPagination: Pagination = {skip: 0, limit: 5};

function Goals() {
  const [pagination, setPagination] = useState(defaultPagination);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>();
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [searchInput, setSearchInput] = useState('');
  const [getGoalsResponse, setGetGoalsResponse] = useState<GetGoalsResponse>();
  const [getTeamsResponse, setGetTeamsResponse] = useState<GetTeamsResponse>();
  const [searchPlayersResponse, setSearchPlayersResponse] = useState<SearchPlayersResponse>();
  const [_, setResetFn] = useOutletContext<[Function, React.Dispatch<Function>]>();

  const {t} = useTranslation();

  const pageCount = Math.ceil(
    (getGoalsResponse ? getGoalsResponse.total : 0) / (pagination.limit || defaultPagination.limit)
  );

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

  useEffect(() => {
    setResetFn(() => () => reset());
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
      playerId: selectedPlayer?.id,
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

  return (
    <div id="home" role="tabpanel" aria-labelledby="home-tab">
      <div className="mt-3">
        <div className="d-flex">
          <Select
            label={t('League')}
            options={[
              {key: 1, value: 1, displayName: t('World Cup')},
              {key: 2, value: 2, displayName: t('Champions League')},
              {key: 3, value: 3, displayName: t('Europa League')},
              {key: 39, value: 39, displayName: t('Premier League')},
              {key: 253, value: 253, displayName: t('Major League Soccer')},
            ]}
            value={selectedLeagueId}
            onChange={handleSelectedLeagueChange}
          ></Select>
          <Select
            label={t('Team')}
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
            label={t('Player')}
            options={
              searchPlayersResponse &&
              searchPlayersResponse.players &&
              searchPlayersResponse.players.map((player) => ({
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
              label={t('Keyword Search')}
              placeholder={t('Search anything')}
              value={searchInput}
              onInput={setSearchInput}
              onEnterKeyDown={handleSubmit}
            ></Input>
          </div>
        </div>

        <br />
      </div>

      {getGoalsResponse?.goals?.map((goal) => (
        <div key={goal.id} data-cy="goal-container" className="mb-4">
          <Video goal={goal}></Video>
        </div>
      ))}

      <br />
      <br />

      <div className="fixed-bottom d-flex justify-content-center">
        {getGoalsResponse?.goals && getGoalsResponse?.goals.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default Goals;
