import {getPreferredTheme} from '../lib/utils';
import Select from './Select';

interface ThemeSelectProps {
  onChange: (value: string) => void;
}

function ThemeSelect({onChange}: ThemeSelectProps) {
  const preferredTheme = getPreferredTheme();

  return (
    <Select
      label="Theme"
      options={[
        {value: 'dark', displayName: 'Dark'},
        {value: 'light', displayName: 'Light'},
      ]}
      value={preferredTheme}
      onChange={onChange}
      showAllOption={false}
    />
  );
}

export default ThemeSelect;
