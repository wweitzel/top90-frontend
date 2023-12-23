import {useTranslation} from 'react-i18next';
import {Theme} from '../lib/theme';
import Select from './Select';

interface ThemeSelectProps {
  theme: Theme;
  onChange: (value: string) => void;
}

function ThemeSelect({theme, onChange}: ThemeSelectProps) {
  const {t} = useTranslation();

  return (
    <Select
      label={t('Theme')}
      options={[
        {key: 'dark', value: 'dark', displayName: t('Dark')},
        {key: 'light', value: 'light', displayName: t('Light')},
      ]}
      value={theme}
      onChange={onChange}
      showAllOption={false}
    />
  );
}

export default ThemeSelect;
