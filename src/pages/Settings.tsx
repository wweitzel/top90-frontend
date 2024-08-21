import {jwtDecode} from 'jwt-decode';
import {useEffect, useState} from 'react';
import ThemeSelect from '../components/ThemeSelect';
import {useTheme} from '../hooks/useTheme';
import {login, Token} from '../lib/api/login';
import {Theme} from '../lib/theme';

function Settings() {
  const {theme, setTheme} = useTheme();

  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('dblclick', onDoubleClick);
    setLoggedIn(!!localStorage.getItem('top90-auth-token'));

    return function cleanup() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('dblclick', onDoubleClick);
    };
  }, []);

  function onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      setShowLogin((show) => !show);
    }
  }

  function onDoubleClick() {
    setShowLogin((show) => !show);
  }

  function onLogin() {
    login(username, password)
      .then((data) => {
        const token = jwtDecode<Token>(data.token);
        if (token.admin) {
          localStorage.setItem('top90-auth-token', data.token);
          setLoggedIn(true);
        } else {
          localStorage.removeItem('top90-auth-token');
          setLoggedIn(false);
        }
      })
      .catch((error) => {
        const message = error?.response?.data?.message;
        alert(message || error);
      });
  }

  function onLogout() {
    localStorage.removeItem('top90-auth-token');
    setLoggedIn(false);
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
