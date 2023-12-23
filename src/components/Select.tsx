import 'bootstrap/js/dist/dropdown';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {usePrevious} from '../hooks/usePrevious';
import {useWindowSize} from '../hooks/useWindowSize';

interface Option {
  displayName: string;
  key: any;
  value: any;
}

interface SelectProps {
  label?: string;
  options?: Option[];
  value?: any;
  onChange: (value: any) => void;
  showSearchInput?: boolean;
  onSearchChange?: (value: string) => void;
  showAllOption?: boolean;
  onFirstInteraction?: () => void;
}

function Select({
  label,
  options,
  value,
  onChange,
  showSearchInput = false,
  onSearchChange = () => {},
  showAllOption = true,
  onFirstInteraction = () => {},
}: SelectProps) {
  const currentOption = options?.find((option) => option.value == value);
  const [searchText, setSearchText] = useState('');
  const prevSearchText = usePrevious(searchText);
  const [hadFirstInteraction, setHadFirstInteraction] = useState(false);
  const {isMobile} = useWindowSize();

  const dropdownId = `${label}-dropdown`;

  const {t} = useTranslation();

  useEffect(() => {
    const id = setTimeout(() => {
      if (searchText || (prevSearchText && prevSearchText.length > 0)) {
        onSearchChange(searchText);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [searchText]);

  useEffect(() => {
    if (hadFirstInteraction) {
      onFirstInteraction();
    }
  }, [hadFirstInteraction]);

  return (
    <div className="form-group text-muted" style={{minWidth: '0px', width: '100%'}}>
      <label className="form-label" htmlFor={dropdownId}>
        {label}
      </label>
      <div className="d-flex">
        <div className="dropdown mr-1 w-100">
          <button
            onClick={() => setHadFirstInteraction(true)}
            type="button"
            className="btn btn-secondary dropdown-toggle w-100 text-left shadow-sm rounded-pill border-none text-start text-muted overflow-hidden"
            id={dropdownId}
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-offset="10,20"
          >
            <span
              className="d-inline-block"
              style={{maxWidth: '90%', overflowX: 'clip', textOverflow: 'ellipsis'}}
            >
              {currentOption?.displayName || t('All')}
            </span>
          </button>
          <div
            className="dropdown-menu overflow-auto w-100 pt-0 shadow"
            style={{maxHeight: isMobile ? '250px' : '300px'}}
            aria-labelledby={dropdownId}
            role="menu"
          >
            {showSearchInput && (
              <div style={{padding: '7px 5px'}}>
                <input
                  type="text"
                  className="form-control"
                  id={`${label}-${t('search')}`}
                  placeholder={t('Search')}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoComplete="off"
                  aria-label={`${label} ${t('search')}`}
                  role="search"
                />
              </div>
            )}
            {showAllOption && (
              <button
                className={`dropdown-item ${!currentOption ? 'active' : ''}`}
                onClick={() => onChange(0)}
                aria-selected={!currentOption}
                role="option"
              >
                {t('All')}
              </button>
            )}
            {options &&
              options
                .sort((option1, option2) =>
                  option1.displayName < option2.displayName
                    ? -1
                    : option1.displayName > option2.displayName
                    ? 1
                    : 0
                )
                .map((option) => (
                  <button
                    className={`dropdown-item ${
                      currentOption && currentOption.value == option.value ? 'active' : ''
                    }`}
                    key={option.key}
                    onClick={() => onChange(option.value)}
                    aria-selected={currentOption && currentOption.value === option.value}
                    role="option"
                  >
                    {option.displayName}
                  </button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Select;
