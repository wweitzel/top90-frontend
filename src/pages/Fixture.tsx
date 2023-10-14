import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {GetFixtureResponse, getFixture as _getFixture} from '../lib/api/fixtures';
import {Header} from '../components/Header';
import {GetGoalsResponse, getGoals as _getGoals} from '../lib/api/goals';
import {getPreferredTheme} from '../lib/utils';
import Video from '../components/Video';
import {FixtureRow} from '../components/FixturesList';

function Fixture() {
  const {fixtureId} = useParams();
  const navigate = useNavigate();

  const getFixture = useCallback(_getFixture, []);
  const getGoals = useCallback(_getGoals, []);

  const [getFixtureResponse, setGetFixtureResponse] = useState<GetFixtureResponse>();
  const [getGoalsResponse, setGetGoalsResponse] = useState<GetGoalsResponse>();

  function navigateHome() {
    navigate('/');
  }

  useEffect(() => {
    if (fixtureId) {
      getFixture(fixtureId).then((data) => {
        setGetFixtureResponse(data);
      });
      getGoals(undefined, {fixtureId: Number(fixtureId)}).then((data) => {
        setGetGoalsResponse(data);
      });
    }
  }, [fixtureId]);

  if (!getFixtureResponse?.fixture) {
    return null;
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="top90-app-container">
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <Header selectedTheme={getPreferredTheme()} onClick={navigateHome}></Header>

            <div className="mb-4">
              <FixtureRow fixture={getFixtureResponse.fixture}></FixtureRow>
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
        </div>

        <div className="d-flex justify-content-center mt-4 mb-5">
          <button onClick={navigateHome} className="btn btn-outline-secondary">
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fixture;
