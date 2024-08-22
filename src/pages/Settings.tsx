import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import ThemeSelect from '../components/ThemeSelect';
import {useTheme} from '../hooks/useTheme';
import {login, logout} from '../lib/api/auth';
import {Theme} from '../lib/theme';

function Settings() {
  const {theme, setTheme} = useTheme();

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.addEventListener('dblclick', onDoubleClick);
    setLoggedIn(!!Cookies.get('top90-logged-in'));

    return function cleanup() {
      document.removeEventListener('dblclick', onDoubleClick);
    };
  }, []);

  function onDoubleClick() {
    setShowLogin((show) => !show);
  }

  function onLogin() {
    login(username, password)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        alert(message || error);
      });
  }

  function onLogout() {
    logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        alert(message || error);
      });
  }

  return (
    <div id="settings" role="tabpanel" aria-labelledby="settings-tab">
      <div className="mt-3">
        <ThemeSelect theme={theme} onChange={(value) => setTheme(value as Theme)}></ThemeSelect>
      </div>
      {showLogin && (
        <div className="mt-3">
          <label className="form-label text-muted">Admin</label>
          {!loggedIn && (
            <>
              <input
                className="form-control rounded-pill shadow-sm"
                placeholder={'Username'}
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-control rounded-pill shadow-sm mt-2"
                placeholder={'Password'}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <div className="d-grid gap-2 mt-2">
                <button onClick={() => onLogin()} className="btn btn-primary btn-md">
                  Login
                </button>
              </div>
            </>
          )}
          {loggedIn && (
            <>
              <div className="d-grid gap-2 mt-2">
                <button onClick={() => onLogout()} className="btn btn-outline-danger btn-md">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;
