import {Goal} from '../api/goals';

export function Video({goal}: {goal: Goal}) {
  return (
    <div key={goal.RedditPostTitle}>
      <h6>{goal.RedditPostTitle}</h6>
      <video className="shadow-sm" width={'100%'} controls muted={true}>
        <source src={goal.PresignedUrl + '#t=0.1'} type="video/mp4"></source>
      </video>
    </div>
  );
}

export default Video;
