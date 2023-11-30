import {useNavigate} from 'react-router-dom';
import {Fixture} from '../lib/api/fixtures';

interface FixtureRowProps {
  fixture?: Fixture;
}

function FixtureRow({fixture}: FixtureRowProps) {
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
              <img
                className="me-2"
                src={fixture.teams.home.logo}
                alt="Home team logo"
                style={{maxWidth: '20px'}}
              ></img>
              <div>{fixture.teams.home.name}</div>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="me-2"
                src={fixture.teams.away.logo}
                alt="Away team logo"
                style={{maxWidth: '20px'}}
              ></img>
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

export default FixtureRow;
