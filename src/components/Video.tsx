import {Goal} from '../api/goals';
import {API_BASE_URL} from '../App';

import {useEffect, useState} from 'react';

const copyButton = {
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
        <button
          style={copyButton}
          onClick={copyShareUrl}
          disabled={disableButton}
          className="btn btn-outline-secondary btn-sm"
        >
          {buttonText}
        </button>
        <div style={daysAgoTextStyle} className="fw-light me-2">
          {daysAgoText(numDaysAgo(new Date(goal.CreatedAt)))}
        </div>
      </div>
    </div>
  );
}

export default Video;
