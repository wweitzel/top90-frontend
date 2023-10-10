import '../index.css';
import {getGoal as _getGoal, GetGoalResponse} from '../lib/api/goals';
import Video from '../components/Video';

import {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Header} from '../components/Header';
import {getPreferredTheme} from '../lib/utils';

function Goal() {
  const {goalId} = useParams();
  const navigate = useNavigate();

  const getGoal = useCallback(_getGoal, []);

  const [getGoalResponse, setGetGoalResponse] = useState<GetGoalResponse>();

  function navigateHome() {
    navigate('/');
  }

  useEffect(() => {
    let isMounted = true;
    if (goalId) {
      getGoal(goalId).then((data) => {
        if (isMounted && data.goal.id !== '') setGetGoalResponse(data);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [getGoal, goalId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="w-100">
          <Header selectedTheme={getPreferredTheme()} onClick={navigateHome}></Header>
          {getGoalResponse?.goal && <Video goal={getGoalResponse?.goal}></Video>}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <button onClick={navigateHome} className="btn btn-outline-secondary">
          Back to homepage
        </button>
      </div>
    </div>
  );
}

export default Goal;
