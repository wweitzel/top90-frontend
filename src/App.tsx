import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Header from './components/Header';
import {ThemeProvider} from './hooks/useTheme';
import Error from './pages/Error';
import Fixture from './pages/Fixture';
import Fixtures from './pages/Fixtures';
import Goal from './pages/Goal';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

import {useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();
  // Child components can attach a reset function to this state via the outlet context
  // so that the header can reset some state that they control.
  const [resetFn, setResetFn] = useState<Function>();

  return (
    <ThemeProvider>
      <div className="container d-flex justify-content-center">
        <div className="top90-app-container">
          <Header resetFn={resetFn} />
          <div className="tab-content">
            <TransitionGroup component={null}>
              <CSSTransition key={location.key} classNames="fade" timeout={100}>
                <Routes location={location}>
                  <Route path="/" element={<Navigate to="/goals" />} errorElement={<Error />} />
                  <Route
                    path="/goals"
                    element={<Goals setResetFn={setResetFn} />}
                    errorElement={<Error />}
                  />
                  <Route path="/fixtures" element={<Fixtures />} errorElement={<Error />} />
                  <Route path="/settings" element={<Settings />} errorElement={<Error />} />
                  <Route path="/settings" element={<Settings />} errorElement={<Error />} />
                  <Route path="/goals/:goalId" element={<Goal />} errorElement={<Error />} />
                  <Route
                    path="/fixtures/:fixtureId"
                    element={<Fixture />}
                    errorElement={<Error />}
                  />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
