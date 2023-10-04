import {Goal} from '../lib/api/goals';
import {API_BASE_URL} from '../lib/api/core';

import {useEffect, useState} from 'react';
import {cloudfrontEnabled} from '../lib/utils';

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
    const goalUrl = `${API_BASE_URL}/message_preview/${goal.id}`;
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

  function cloudfrontUrl(s3Key: string) {
    return 'https://s3-redditsoccergoals.top90.io/' + s3Key;
  }

  function thumbnailUrl(goal: Goal) {
    if (cloudfrontEnabled()) {
      return cloudfrontUrl(goal.thumbnailS3Key);
    }

    return goal.thumbnailPresignedUrl;
  }

  function videoUrl(goal: Goal) {
    if (cloudfrontEnabled()) {
      return cloudfrontUrl(goal.s3ObjectKey);
    }

    return goal.presignedUrl;
  }

  return (
    <div key={goal.redditPostTitle}>
      <div className="mb-1">
        <h6>{goal.redditPostTitle}</h6>
      </div>
      <video poster={thumbnailUrl(goal)} className="shadow-sm" width={'100%'} controls muted={true}>
        <source src={videoUrl(goal)} type="video/mp4"></source>
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
            onClick={() => goToRedditPost(postId(goal.redditFullname))}
            className="btn btn-outline-secondary btn-sm"
          >
            Comments
          </button>
        </div>
        <div style={daysAgoTextStyle} className="fw-light me-2">
          {daysAgoText(numDaysAgo(new Date(goal.createdAt)))}
        </div>
      </div>
    </div>
  );
}

export default Video;
