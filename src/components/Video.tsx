import {PUBLIC_URL} from '../lib/api/core';
import {Goal} from '../lib/api/goals';

import {useEffect, useState} from 'react';
import {cloudfrontEnabled} from '../lib/utils';

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
    const goalUrl = `${PUBLIC_URL}/goals/${goal.id}`;
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
      <h6>{goal.redditPostTitle}</h6>
      <video poster={thumbnailUrl(goal)} className="shadow-sm w-100" controls muted={true}>
        <source src={videoUrl(goal)} type="video/mp4"></source>
      </video>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            onClick={() => copyShareUrl()}
            disabled={disableButton}
            className="btn btn-outline-secondary btn-sm border-0"
          >
            {buttonText}
          </button>
          <button
            onClick={() => goToRedditPost(postId(goal.redditFullname))}
            className="btn btn-outline-secondary btn-sm border-0"
          >
            Comments
          </button>
        </div>
        <div style={{fontSize: '14px'}} className="text-muted me-2">
          {daysAgoText(numDaysAgo(new Date(goal.createdAt)))}
        </div>
      </div>
    </div>
  );
}

export default Video;
