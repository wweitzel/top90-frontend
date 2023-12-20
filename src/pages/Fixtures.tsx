import {useEffect, useState} from 'react';
import FixturesList from '../components/FixturesList';
import {getFixtures, GetFixturesResponse} from '../lib/api/fixtures';
import {getLeagues, GetLeaguesResponse} from '../lib/api/leagues';

function Fixtures() {
  const [getFixturesResponse, setGetFixturesResponse] = useState<GetFixturesResponse>();
  const [getLeaguesResponse, setGetLeaguesResponse] = useState<GetLeaguesResponse>();

  useEffect(() => {
    getFixtures({todayOnly: true}).then((data) => {
      setGetFixturesResponse(data);
    });
    getLeagues().then((data) => {
      setGetLeaguesResponse(data);
    });
  }, []);

  return (
    <div id="fixtures" role="tabpanel" aria-labelledby="fixtures-tab">
      <div className="mb-4">
        <FixturesList
          fixtures={getFixturesResponse?.fixtures}
          leagues={getLeaguesResponse?.leagues}
        ></FixturesList>
      </div>
    </div>
  );
}

export default Fixtures;
