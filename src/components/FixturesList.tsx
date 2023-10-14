import {useNavigate} from 'react-router-dom';
import {Fixture} from '../lib/api/fixtures';
import {League} from '../lib/api/leagues';

function leaguesForFixtures(fixtures: Fixture[], leagues: League[]): League[] {
  const leaguesForFixtures = new Set<League>();
  fixtures.forEach((fixture) => {
    const league = leagues.find((league) => league.id === fixture.leagueId);
    if (league) {
      leaguesForFixtures.add(league);
    }
  });

  return Array.from(leaguesForFixtures);
}

interface FixtureRowProps {
  fixture?: Fixture;
}

export function FixtureRow({fixture}: FixtureRowProps) {
  const navigate = useNavigate();

  if (!fixture) {
    return null;
  }

  return (
    <>
      <button
        className="btn btn-secondary d-flex align-items-center border w-100 shadow-sm text-muted mb-2"
        key={fixture.id}
        onClick={() => navigate(`/fixtures/${fixture.id}`)}
      >
        <div className="d-flex justify-content-between h-100 w-100">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <img className="me-2" src={fixture.teams.home.logo} style={{maxWidth: '20px'}}></img>
              <div>{fixture.teams.home.name}</div>
            </div>
            <div className="d-flex align-items-center">
              <img className="me-2" src={fixture.teams.away.logo} style={{maxWidth: '20px'}}></img>
              <div>{fixture.teams.away.name}</div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div>{new Date(fixture.date).toDateString()}</div>
            <div>{new Date(fixture.date).toLocaleTimeString()}</div>
          </div>
        </div>
      </button>
    </>
  );
}

interface FixturesListProps {
  fixtures?: Fixture[];
  leagues?: League[];
}

export function FixturesList({fixtures, leagues}: FixturesListProps) {
  if (!fixtures || !leagues) {
    return null;
  }

  const filteredLeagues = leaguesForFixtures(fixtures, leagues);

  return (
    <div className="btn-group-vertical text-muted w-100" role="group">
      {filteredLeagues.map((league) => (
        <div key={league.id} className="w-100">
          <div className="d-flex mb-3 align-items-start">
            <img src={league.logo} className="me-2" height={25}></img>
            <div>{league.name}</div>
          </div>
          <>
            {fixtures.map((fixture) => (
              <FixtureRow key={fixture.id} fixture={fixture}></FixtureRow>
            ))}
          </>
        </div>
      ))}
    </div>
  );
}
