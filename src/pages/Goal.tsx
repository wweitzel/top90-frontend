import Video from '../components/Video';
import '../index.css';
import {getGoal, GetGoalResponse} from '../lib/api/goals';

import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from '../components/Header';
import {getPreferredTheme} from '../lib/utils';

function Goal() {
  const {goalId} = useParams();
  const navigate = useNavigate();

  const [getGoalResponse, setGetGoalResponse] = useState<GetGoalResponse>();

  function navigateHome() {
    navigate('/');
  }

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
