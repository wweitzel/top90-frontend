import '../index.css';
import _logo from '../assets/top90logo.png';
import {getGoal as _getGoal, GoalResponse} from '../api/goals';
import Video from '../components/Video';

import {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const logo = {
  height: 250,
  cursor: 'pointer',
};

function Goal() {
  const {goalId} = useParams();
  const navigate = useNavigate();

  const getGoal = useCallback(_getGoal, []);

  const [getGoalResponse, setGetGoalResponse] = useState<GoalResponse>();

  function navigateHome() {
    navigate('/');
  }

  useEffect(() => {
    let isMounted = true;
    if (goalId) {
      getGoal(goalId).then((data) => {
        if (isMounted && data.goal.Id !== '') setGetGoalResponse(data);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [getGoal, goalId]);

  return (
    <div className="container">
      <Helmet>
        <title>{getGoalResponse?.goal.RedditPostTitle}</title>
        <meta name="description" content={getGoalResponse?.goal.RedditPostTitle} />
        <meta property="og:title" key="og:title" content={getGoalResponse?.goal.RedditPostTitle} />
        <meta
          property="og:image"
          key="og:image"
          content={getGoalResponse?.goal.ThumbnailPresignedUrl}
        />
      </Helmet>
      <div className="d-flex justify-content-center">
        <div className="w-100">
          <div className="d-flex justify-content-center">
            <img style={logo} src={_logo} onClick={navigateHome} alt="logo" />
          </div>
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
