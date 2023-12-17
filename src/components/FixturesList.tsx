import {Fixture} from '../lib/api/fixtures';
import {League} from '../lib/api/leagues';
import FixtureRow from './FixtureRow';

interface FixturesListProps {
  fixtures?: Fixture[];
  leagues?: League[];
}

function leaguesForFixtures(fixtures: Fixture[], leagues: League[]): League[] {
  const uniqueLeagueIds = new Set(fixtures.map((fixture) => fixture.leagueId));
  const filteredLeagues = leagues.filter((league) => uniqueLeagueIds.has(league.id));

  return filteredLeagues;
}

function FixturesList({fixtures, leagues}: FixturesListProps) {
  if (!fixtures || !leagues) {
    return null;
  }

  const filteredLeagues = leaguesForFixtures(fixtures, leagues);

  return (
    <div className="btn-group-vertical text-muted w-100" role="group">
      {filteredLeagues.map((league) => (
        <div key={league.id} className="w-100" data-cy="fixture-group">
          <div className="d-flex mb-3 mt-4 align-items-center">
            <img src={league.logo} alt="League Logo" className="me-2" height={25} width={25}></img>
            <div>{league.name}</div>
          </div>
          <>
            {fixtures.map(
              (fixture) =>
                fixture.leagueId === league.id && <FixtureRow key={fixture.id} fixture={fixture} />
            )}
          </>
        </div>
      ))}
    </div>
  );
}

export default FixturesList;
