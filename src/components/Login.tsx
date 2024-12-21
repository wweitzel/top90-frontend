import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import {login, logout} from '../lib/api/auth';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setLoggedIn(!!Cookies.get('top90-logged-in'));
  }, []);

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
    <div>
      {!loggedIn && (
        <>
          <input
            className="form-control rounded-pill shadow-sm"
            placeholder={'Username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control rounded-pill shadow-sm mt-2"
            placeholder={'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-grid gap-2 mt-3">
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
  );
}

export default Login;
