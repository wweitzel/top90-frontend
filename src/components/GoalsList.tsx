import type {Goal} from '../pages/Goals';

export function GoalsList({goals = []}: {goals?: Goal[]}) {
  return (
    <>
      {goals.map((goal) => (
        <div style={{width: '100%', marginBottom: '20px'}} key={goal.RedditPostTitle}>
          <h6 style={{textAlign: 'left'}}>{goal.RedditPostTitle}</h6>
          <video className="shadow-sm" width={'100%'} controls controlsList="download" muted={true}>
            <source src={goal.PresignedUrl + '#t=0.1'} type="video/mp4"></source>
          </video>
        </div>
      ))}
    </>
  );
}
