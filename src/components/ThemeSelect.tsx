import {Theme} from '../lib/theme';
import Select from './Select';

interface ThemeSelectProps {
  theme: Theme;
  onChange: (value: string) => void;
}

function ThemeSelect({theme, onChange}: ThemeSelectProps) {
  return (
    <Select
      label="Theme"
      options={[
        {key: 'dark', value: 'dark', displayName: 'Dark'},
        {key: 'light', value: 'light', displayName: 'Light'},
      ]}
      value={theme}
      onChange={onChange}
      showAllOption={false}
    />
  );
}

export default ThemeSelect;
