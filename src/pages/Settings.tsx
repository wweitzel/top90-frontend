import ThemeSelect from '../components/ThemeSelect';
import {useTheme} from '../hooks/useTheme';

function Settings() {
  const {theme, setTheme} = useTheme();

  return (
    <div id="settings" role="tabpanel" aria-labelledby="settings-tab">
      <div className="mt-3">
        <ThemeSelect theme={theme} onChange={(value) => setTheme(value as Theme)}></ThemeSelect>
      </div>
    </div>
  );
}

export default Settings;
