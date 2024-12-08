import {useEffect, useState} from 'react';

import {BrightnessHigh, QuestionCircle} from 'react-bootstrap-icons';
import {NavLink, Outlet, useMatch} from 'react-router-dom';
import logoBlack from '../assets/top90logo-black.avif';
import logoWhite from '../assets/top90logo-white.avif';
import {useTheme} from '../hooks/useTheme';
import About from './About';

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
            <div
              className="modal fade"
              id="aboutModal"
              tabIndex={-1}
              aria-labelledby="aboutModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="aboutModalLabel">
                      About
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <About />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
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
