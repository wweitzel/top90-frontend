import {Link} from 'react-router-dom';
import {Fixture} from '../lib/api/fixtures';

interface FixtureRowProps {
  fixture?: Fixture;
}

function FixtureRow({fixture}: FixtureRowProps) {
  if (!fixture) {
    return null;
  }

  const date = new Date(fixture.date);

  function formattedTime(date: Date) {
    let hours = date.getHours();
    hours = hours % 12 || 12;
    let minutes = date.getMinutes().toString();
    minutes = minutes.padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <>
      <Link
        className="btn btn-secondary d-flex align-items-center border w-100 shadow-sm text-muted mb-2"
        key={fixture.id}
        to={`/fixtures/${fixture.id}`}
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
            <div>{date.toDateString()}</div>
            <div>{formattedTime(date)}</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default FixtureRow;
