import {useEffect, useState} from 'react';

import logoBlack from '../assets/top90logo-black.avif';
import logoWhite from '../assets/top90logo-white.avif';

interface HeaderProps {
  selectedTheme: string;
  onClick?: () => void;
}

const DARK = 'dark';

function Header({selectedTheme, onClick}: HeaderProps) {
  const [logo, setLogo] = useState(logoBlack);

  useEffect(() => {
    const logoToDisplay = selectedTheme === DARK ? logoWhite : logoBlack;
    setLogo(logoToDisplay);
  }, [selectedTheme]);

  return (
    <div className="d-flex justify-content-center">
      <img height={250} src={logo} onClick={onClick} alt="logo" role="button" />
    </div>
  );
}

export default Header;
