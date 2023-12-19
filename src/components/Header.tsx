import {useEffect, useState} from 'react';

import {NavLink, useMatch} from 'react-router-dom';
import logoBlack from '../assets/top90logo-black.avif';
import logoWhite from '../assets/top90logo-white.avif';
import {useTheme} from '../hooks/useTheme';

interface HeaderProps {
  resetFn?: Function;
}

const DARK = 'dark';

function getLogo(theme: string) {
  return theme === DARK ? logoWhite : logoBlack;
}

function Header({resetFn}: HeaderProps) {
  const {theme} = useTheme();
  const [logo, setLogo] = useState(getLogo(theme));

  useEffect(() => {
    const logoToDisplay = getLogo(theme);
    setLogo(logoToDisplay);
  }, [theme]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <img
          height={250}
          src={logo}
          onClick={() => resetFn && resetFn()}
          alt="logo"
          role="button"
        />
      </div>

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
            aria-selected={Boolean(useMatch('/goals'))}
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
            aria-selected={Boolean(useMatch('/fixtures'))}
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
            aria-selected={Boolean(useMatch('/settings'))}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default Header;
