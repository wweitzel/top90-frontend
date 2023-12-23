import {useEffect, useState} from 'react';

import {NavLink, Outlet, useLocation, useMatch} from 'react-router-dom';
import logoBlack from '../assets/top90logo-black.avif';
import logoWhite from '../assets/top90logo-white.avif';
import {useTheme} from '../hooks/useTheme';

const DARK = 'dark';

function getLogo(theme: string) {
  return theme === DARK ? logoWhite : logoBlack;
}

function shouldShowNav(pathName: string) {
  const goalDrilldownRegex = /goals\/\w+/g;

  return !goalDrilldownRegex.test(pathName);
}

function Header() {
  // Child components can attach a reset function to this state via the outlet context
  // so that the header can reset some state that they control.
  const [resetFn, setResetFn] = useState<() => void>();
  const {theme} = useTheme();
  const [logo, setLogo] = useState(getLogo(theme));
  const {pathname} = useLocation();

  useEffect(() => {
    const logoToDisplay = getLogo(theme);
    setLogo(logoToDisplay);
  }, [theme]);

  const homeActive = Boolean(useMatch('/goals'));
  const fixturesActive = Boolean(useMatch('/fixtures'));
  const settingsActive = Boolean(useMatch('/settings'));

  return (
    <div className="container d-flex justify-content-center">
      <div className="top90-app-container">
        <div className="d-flex justify-content-center">
          <img height={250} src={logo} onClick={resetFn} alt="logo" role="button" />
        </div>

        {shouldShowNav(pathname) && (
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <NavLink
                to="/goals"
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
            <li className="nav-item">
              <NavLink
                to="/settings"
                className={({isActive}) => {
                  return `nav-link ${isActive ? 'active' : ''}`;
                }}
                id="settings-tab"
                type="button"
                aria-controls="settings"
                aria-selected={settingsActive}
              >
                Settings
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
