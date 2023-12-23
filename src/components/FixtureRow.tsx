import {format} from 'date-fns';
import * as locales from 'date-fns/locale';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Fixture} from '../lib/api/fixtures';

interface FixtureRowProps {
  fixture?: Fixture;
}

function FixtureRow({fixture}: FixtureRowProps) {
  if (!fixture) {
    return null;
  }

  const {t} = useTranslation();

  const localesMap: {[key: string]: locales.Locale} = locales;

  const date = new Date(fixture.date);

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
                alt={t('Home team logo')}
                style={{maxWidth: '20px'}}
                width={20}
                height={20}
              ></img>
              <div>{fixture.teams.home.name}</div>
            </div>
            <div className="d-flex align-items-center">
              <img
                className="me-2"
                src={fixture.teams.away.logo}
                alt={t('Away team logo')}
                style={{maxWidth: '20px'}}
                width={20}
                height={20}
              ></img>
              <div>{fixture.teams.away.name}</div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            {/* Sat Dec 23 2023 */}
            <div>{format(date, 'EEE MMM d yyyy', {locale: localesMap[navigator.language]})}</div>
            {/* 8:15 AM */}
            <div>{format(date, 'p', {locale: localesMap[navigator.language]})}</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default FixtureRow;
