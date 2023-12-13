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
        {key: 'dark', value: 'dark', displayName: 'Dark'},
        {key: 'light', value: 'light', displayName: 'Light'},
      ]}
      value={preferredTheme}
      onChange={onChange}
      showAllOption={false}
    />
  );
}

export default ThemeSelect;
