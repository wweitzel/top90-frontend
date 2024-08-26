import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NavLink, useParams} from 'react-router-dom';
import FixtureRow from '../components/FixtureRow';
import Video from '../components/Video';
import {getFixture, GetFixtureResponse} from '../lib/api/fixtures';
import {getGoals, GetGoalsResponse} from '../lib/api/goals';

function Fixture() {
  const {fixtureId} = useParams();
  const {t} = useTranslation();

  const [getFixtureResponse, setGetFixtureResponse] = useState<GetFixtureResponse>();
  const [getGoalsResponse, setGetGoalsResponse] = useState<GetGoalsResponse>();

  useEffect(() => {
    if (fixtureId) {
      getFixture(fixtureId).then((data) => {
        setGetFixtureResponse(data);
      });
      getGoals({skip: 0, limit: 20}, {fixtureId: Number(fixtureId)}).then((data) => {
        setGetGoalsResponse(data);
      });
    }
  }, [fixtureId]);

  if (!getFixtureResponse?.fixture) {
    return null;
  }

  return (
    <>
      <div className="w-100 mt-4">
        <div className="mb-4">
          <FixtureRow fixture={getFixtureResponse.fixture} />
        </div>

        {getGoalsResponse?.goals?.map((goal) => (
          <div key={goal.id} className="mb-4">
            <Video goal={goal}></Video>
          </div>
        ))}

        {(!getGoalsResponse?.goals || getGoalsResponse.goals.length === 0) && (
          <div className="mb-4">No goals found for this fixture.</div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4 mb-5">
        <NavLink to="/" className="btn btn-outline-secondary">
          {t('Back to homepage')}
        </NavLink>
      </div>
    </>
  );
}

export default Fixture;
