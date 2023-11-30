import {useEffect, useState} from 'react';
import {API_BASE_URL} from '../lib/api/core';
import {Goal} from '../lib/api/goals';
import {cloudfrontEnabled} from '../lib/utils';

const DEFAULT_BUTTON_TEXT = 'Copy Link';
const CLICKED_BUTTON_TEXT = 'Link Copied';
const CLOUDFRONT_BASE_URL = 'https://s3-redditsoccergoals.top90.io/';
const REDDIT_COMMENTS_BASE_URL = 'https://www.reddit.com/r/soccer/comments/';

function Video({goal}: {goal: Goal}) {
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
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

    setButtonText(CLICKED_BUTTON_TEXT);
    setDisableButton(true);

    const timeout = setTimeout(() => {
      setButtonText(DEFAULT_BUTTON_TEXT);
      setDisableButton(false);
    }, 3000);

    setTimer(timeout);
  }

  function formatDateAgo(date: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    const hourDifference = timeDifference / (1000 * 3600);
    const minuteDifference = timeDifference / (1000 * 60);

    if (dayDifference >= 1) {
      const numDays = Math.trunc(dayDifference);
      return numDays === 1 ? '1 day ago' : `${numDays} days ago`;
    } else if (hourDifference >= 1) {
      const numHours = Math.trunc(hourDifference);
      return numHours === 1 ? '1 hour ago' : `${numHours} hours ago`;
    } else if (minuteDifference >= 1) {
      const numMinutes = Math.trunc(minuteDifference);
      return numMinutes === 1 ? '1 minute ago' : `${numMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  }

  function navigateToRedditPost(postId: string) {
    window.open(`${REDDIT_COMMENTS_BASE_URL}${postId}`, '_blank');
  }

  function getPostId(fullName: string) {
    return fullName.substring(3, fullName.length);
  }

  function getCloudfrontUrl(s3Key: string) {
    return `${CLOUDFRONT_BASE_URL}${s3Key}`;
  }

  function getThumbnailUrl(goal: Goal) {
    return cloudfrontEnabled() ? getCloudfrontUrl(goal.thumbnailS3Key) : goal.thumbnailPresignedUrl;
  }

  function getVideoUrl(goal: Goal) {
    return cloudfrontEnabled() ? getCloudfrontUrl(goal.s3ObjectKey) : goal.presignedUrl;
  }

  return (
    <div key={goal.redditPostTitle}>
      <h6>{goal.redditPostTitle}</h6>
      <video poster={getThumbnailUrl(goal)} className="shadow-sm w-100" controls muted={true}>
        <source src={getVideoUrl(goal)} type="video/mp4"></source>
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
            onClick={() => navigateToRedditPost(getPostId(goal.redditFullname))}
            className="btn btn-outline-secondary btn-sm border-0"
          >
            Comments
          </button>
        </div>
        <div style={{fontSize: '14px'}} className="text-muted me-2">
          {formatDateAgo(new Date(goal.createdAt))}
        </div>
      </div>
    </div>
  );
}

export default Video;
