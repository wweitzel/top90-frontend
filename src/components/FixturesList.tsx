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
  showDate?: boolean;
}

export function FixtureRow({fixture, showDate = true}: FixtureRowProps) {
  const navigate = useNavigate();

  if (!fixture) {
    return null;
  }

  return (
    <>
      {showDate && <div>{new Date(fixture.date).toLocaleTimeString()}</div>}
      <button
        className="btn btn-secondary d-flex align-items-center border w-100 shadow-sm text-muted mb-2"
        style={{borderRadius: '20px'}}
        key={fixture.id}
        onClick={() => navigate(`/fixtures/${fixture.id}`)}
      >
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <div className="d-flex align-items-center">
            <img className="me-2" src={fixture.teams.home.logo} height={20}></img>
            <div className="me-2">{fixture.teams.home.name}</div>
          </div>
          <div className="d-flex align-items-center">
            <img className="ms-2 me-2" src={fixture.teams.away.logo} height={20}></img>
            <div className="">{fixture.teams.away.name}</div>
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
      <div className="form-label mb-3">{new Date().toDateString()}</div>

      {filteredLeagues.map((league) => (
        <div key={league.id} className="w-100">
          <div className="d-flex mb-2">
            <img src={league.logo} height={20} className="me-2"></img>
            <h6>{league.name}</h6>
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
