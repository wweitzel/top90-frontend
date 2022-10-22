import {memo} from 'react';
import './App.css';
import useGetOneGoal from './hooks/useGetOneGoal';

function SingleGoal() {
  const {isLoading, data: goal} = useGetOneGoal();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div style={{width: '100%', marginBottom: '20px'}} key={goal.goal.RedditPostTitle}>
      <h6 style={{textAlign: 'left'}}>{goal.goal.RedditPostTitle}</h6>
      <video width={'100%'} controls controlsList="download" muted={true}>
        <source src={goal.goal.PresignedUrl + '#t=0.1'} type="video/mp4"></source>
      </video>
    </div>
  );
}

export default memo(SingleGoal);
