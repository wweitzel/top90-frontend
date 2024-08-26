import {useTranslation} from 'react-i18next';
import Video from '../components/Video';
import '../index.css';
import {getGoal, GetGoalResponse} from '../lib/api/goals';

import {useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';

function Goal() {
  const {goalId} = useParams();
  const {t} = useTranslation();

  const [getGoalResponse, setGetGoalResponse] = useState<GetGoalResponse>();

  useEffect(() => {
    if (goalId) {
      getGoal(goalId).then((data) => {
        setGetGoalResponse(data);
      });
    }
  }, [goalId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="w-100">
          {getGoalResponse?.goal && <Video goal={getGoalResponse?.goal}></Video>}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-5">
        <NavLink to="/" className="btn btn-outline-secondary">
          {t('Back to homepage')}
        </NavLink>
      </div>
    </div>
  );
}

export default Goal;
