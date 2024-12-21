import {Fixture} from '../lib/api/fixtures';
import {League} from '../lib/api/leagues';
import FixtureRow from './FixtureRow';

interface FixturesListProps {
  fixtures?: Fixture[];
  leagues?: League[];
  maxPerLeague?: number;
  onlyUpcoming?: boolean;
}

function leaguesForFixtures(
  fixtures: Fixture[],
  leagues: League[],
  onlyUpcoming?: boolean
): League[] {
  if (onlyUpcoming) {
    fixtures = fixtures.filter((fixture) => new Date(fixture.date) > new Date());
  }
  const uniqueLeagueIds = new Set(fixtures.map((fixture) => fixture.leagueId));
  return leagues.filter((league) => uniqueLeagueIds.has(league.id));
}

function fixturesForLeague(fixtures: Fixture[], leagueId: number, onlyUpcoming?: boolean) {
  fixtures = fixtures.filter((fixture) => fixture.leagueId === leagueId);
  if (onlyUpcoming) {
    return fixtures.filter((fixture) => new Date(fixture.date) > new Date());
  }
  return fixtures;
}

function FixturesList({fixtures, leagues, maxPerLeague, onlyUpcoming}: FixturesListProps) {
  if (!fixtures || !leagues) {
    return null;
  }

  const limit = maxPerLeague ? maxPerLeague : undefined;
  const filteredLeagues = leaguesForFixtures(fixtures, leagues, onlyUpcoming);

  return (
    <div className="btn-group-vertical text-muted w-100" role="group">
      {filteredLeagues.map((league) => (
        <div key={league.id} className="w-100" data-cy="fixture-group">
          <div className="d-flex mb-3 mt-4 align-items-center">
            <img src={league.logo} alt="League Logo" className="me-2" height={25} width={25}></img>
            <div>{league.name}</div>
          </div>
          <div>
            {fixturesForLeague(fixtures, league.id, onlyUpcoming)
              .slice(0, limit)
              .map((fixture) => (
                <FixtureRow key={fixture.id} fixture={fixture} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FixturesList;
