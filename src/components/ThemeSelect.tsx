import {getPreferredTheme} from '../lib/utils';

interface ThemeSelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function ThemeSelect({onChange}: ThemeSelectProps) {
  const preferredTheme = getPreferredTheme();

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="select">
        Theme
      </label>
      <select
        value={preferredTheme}
        onChange={onChange}
        name="select"
        id="select"
        style={{borderRadius: '20px'}}
        className="form-select mb-4"
      >
        <option hidden>Theme</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}

export default ThemeSelect;
