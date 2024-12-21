import {useEffect, useState} from 'react';

import {BrightnessHigh, QuestionCircle} from 'react-bootstrap-icons';
import {NavLink, Outlet, useMatch} from 'react-router-dom';
import logoBlack from '../assets/top90logo-black.avif';
import logoWhite from '../assets/top90logo-white.avif';
import {useLongPress} from '../hooks/useLongPress';
import {useTheme} from '../hooks/useTheme';
import About from './About';
import Login from './Login';
import Modal from './Modal';

declare const bootstrap: any;

const DARK = 'dark';

function getLogo(theme: string) {
  return theme === DARK ? logoWhite : logoBlack;
}

function Header() {
  // Child components can attach a reset function to this state via the outlet context
  // so that the header can reset some state that they control.
  const [resetFn, setResetFn] = useState<() => void>();
  const {theme, setTheme} = useTheme();
  const [logo, setLogo] = useState(getLogo(theme));

  const [loginModal, setLoginModal] = useState<any>();

  const handleLongPress = () => {
    loginModal.toggle();
  };

  const {isPressed, handlers} = useLongPress({
    onLongPress: handleLongPress,
    duration: 2000,
  });

  function onContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('contextmenu', onContextMenu);

    return function cleanup() {
      document.removeEventListener('contextmenu', onContextMenu);
    };
  }, []);

  useEffect(() => {
    if (!loginModal) {
      let aboutModal = new bootstrap.Modal(document.getElementById('loginModal') as any, {
        keyboard: false,
      });
      setLoginModal(aboutModal);
    }
  }, []);

  useEffect(() => {
    const logoToDisplay = getLogo(theme);
    setLogo(logoToDisplay);
  }, [theme]);

  const fixturesActive = Boolean(useMatch('/fixtures'));
  const goalsDrilldownActive = Boolean(useMatch('/goals/:goalId'));
  const homeActive = Boolean(useMatch('/goals')) || (!fixturesActive && !goalsDrilldownActive);

  return (
    <div className="container d-flex justify-content-center">
      <div className="top90-app-container">
        <div className="d-flex flex-column justify-content-center">
          <div
            style={{
              marginBottom: '-36px',
            }}
            className="align-self-end"
          >
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="btn btn-lg p-2 pt-0 pb-1 mt-2"
              style={{
                position: 'relative',
                zIndex: '1',
              }}
            >
              <BrightnessHigh />
            </button>
            <button
              type="button"
              className="btn btn-lg p-2 pt-0 pb-1 mt-2"
              data-bs-toggle="modal"
              data-bs-target="#aboutModal"
            >
              <QuestionCircle />
            </button>
            <Modal id="aboutModal" title="About">
              <About />
            </Modal>
            <Modal id="loginModal" title="Login">
              <Login />
            </Modal>
          </div>
          <img
            {...handlers}
            className="align-self-center"
            height={250}
            src={logo}
            onClick={resetFn}
            alt="logo"
            role="button"
          />
        </div>

        {!goalsDrilldownActive && (
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({isActive}) => {
                  return `nav-link ${isActive ? 'active' : ''}`;
                }}
                id="home-tab"
                type="button"
                aria-controls="home"
                aria-selected={homeActive}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/fixtures"
                className={({isActive}) => {
                  return `nav-link ${isActive ? 'active' : ''}`;
                }}
                id="fixtures-tab"
                type="button"
                aria-controls="fixtures"
                aria-selected={fixturesActive}
              >
                Fixtures
              </NavLink>
            </li>
          </ul>
        )}

        <div className="tab-content">
          <Outlet context={[resetFn, setResetFn]} />
        </div>
      </div>
    </div>
  );
}

export default Header;
