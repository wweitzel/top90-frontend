import {formatDistance} from 'date-fns';
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

    return formatDistance(date, now, {addSuffix: true}).replace('about ', '');
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
          <a
            href={`${REDDIT_COMMENTS_BASE_URL}${getPostId(goal.redditFullname)}`}
            target="_blank"
            className="btn btn-outline-secondary btn-sm border-0"
          >
            Comments
          </a>
        </div>
        <div style={{fontSize: '14px'}} className="text-muted me-2">
          {formatDateAgo(new Date(goal.redditPostCreatedAt))}
        </div>
      </div>
    </div>
  );
}

export default Video;
