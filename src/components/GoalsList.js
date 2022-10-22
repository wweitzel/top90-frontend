function GoalsList(props = {goals: []}) {
  return (
    <>
      {props.goals.map((video, i) => (
        <div style={{width: '100%', marginBottom: '20px'}} key={video.RedditPostTitle}>
          <h6 style={{textAlign: 'left'}}>{video.RedditPostTitle}</h6>
          <video className="shadow-sm" width={'100%'} controls controlsList="download" muted={true}>
            <source src={video.PresignedUrl + '#t=0.1'} type="video/mp4"></source>
          </video>
        </div>
      ))}
    </>
  );
}

export default GoalsList;
