import {Goal} from '../api/goals';
import {BASE_URL} from '../App';

import {useEffect, useState} from 'react';

const copyButton = {
  border: 'none',
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
    const goalUrl = `${BASE_URL}/goals/${goal.Id}`;
    navigator.clipboard.writeText(goalUrl);

    setButtonText(clickedButtonText);
    setDisableButton(true);

    const timeout = setTimeout(() => {
      setButtonText(defaultButtonText);
      setDisableButton(false);
    }, 3000);

    setTimer(timeout);
  }

  return (
    <div key={goal.RedditPostTitle}>
      <div className="d-flex justify-content-between align-items-center mb-1">
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
      <button
        style={copyButton}
        onClick={copyShareUrl}
        disabled={disableButton}
        className="btn btn-outline-secondary btn-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Video;
