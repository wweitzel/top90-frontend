import {Goal} from '../api/goals';
import {API_BASE_URL} from '../api/core';

import {useEffect, useState} from 'react';

const buttonStyle = {
  border: 'none',
};

const daysAgoTextStyle = {
  fontSize: '14px',
};

const defaultButtonText = 'Copy Link';
const clickedButtonText = 'Link Copied';

export function Video({goal}: {goal: Goal}) {
  const [buttonText, setButtonText] = useState(defaultButtonText);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  });

  function copyShareUrl() {
    const goalUrl = `${API_BASE_URL}/message_preview/${goal.Id}`;
    navigator.clipboard.writeText(goalUrl);

    setButtonText(clickedButtonText);
    setDisableButton(true);

    const timeout = setTimeout(() => {
      setButtonText(defaultButtonText);
      setDisableButton(false);
    }, 3000);

    setTimer(timeout);
  }

  function numDaysAgo(date: Date) {
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    return Math.trunc(dayDifference);
  }

  function goToRedditPost(postId: string) {
    window.open(`https://www.reddit.com/r/soccer/comments/${postId}`, '_blank');
  }

  function postId(fullName: string) {
    return fullName.substring(3, fullName.length);
  }

  function daysAgoText(num: number) {
    if (num < 1) {
      return '';
    } else if (num === 1) {
      return '1 day ago';
    } else {
      return num + ' days ago';
    }
  }

  return (
    <div key={goal.RedditPostTitle}>
      <div className="mb-1">
        <h6>{goal.RedditPostTitle}</h6>
      </div>
      <video
        poster={goal.ThumbnailPresignedUrl}
        className="shadow-sm"
        width={'100%'}
        controls
        muted={true}
      >
        <source src={goal.PresignedUrl} type="video/mp4"></source>
      </video>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            style={buttonStyle}
            onClick={() => copyShareUrl()}
            disabled={disableButton}
            className="btn btn-outline-secondary btn-sm"
          >
            {buttonText}
          </button>
          <button
            style={buttonStyle}
            onClick={() => goToRedditPost(postId(goal.RedditFullname))}
            className="btn btn-outline-secondary btn-sm"
          >
            Comments
          </button>
        </div>
        <div style={daysAgoTextStyle} className="fw-light me-2">
          {daysAgoText(numDaysAgo(new Date(goal.CreatedAt)))}
        </div>
      </div>
    </div>
  );
}

export default Video;
