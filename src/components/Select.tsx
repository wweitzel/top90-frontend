import 'bootstrap/js/dist/dropdown';
import {useState} from 'react';

interface Option {
  displayName: string;
  value: number | string;
}

interface SelectProps {
  label?: string;
  options?: Option[];
  value?: number | string;
  onChange: (value: any) => void;
  showSearchInput?: boolean;
  showAllOption?: boolean;
}

function Select({
  label,
  options,
  value,
  onChange,
  showSearchInput = false,
  showAllOption = true,
}: SelectProps) {
  const currentOption = options?.find((option) => option.value == value);
  const [searchText, setSearchText] = useState('');

  const dropdownId = `dropdown-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="form-group text-muted" style={{minWidth: '0px', width: '100%'}}>
      <label className="form-label" htmlFor={dropdownId}>
        {label}
      </label>
      <div className="d-flex">
        <div className="dropdown mr-1 w-100">
          <button
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
              {currentOption?.displayName || 'All'}
            </span>
          </button>
          <div
            className="dropdown-menu overflow-auto w-100 pt-0 shadow"
            style={{maxHeight: '300px'}}
            aria-labelledby={dropdownId}
            role="menu"
          >
            {showSearchInput && (
              <div style={{padding: '7px 5px'}}>
                <input
                  type="text"
                  className="form-control"
                  id={`${label}-search`}
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoComplete="off"
                  aria-label="Search"
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
                All
              </button>
            )}
            {options &&
              options
                .filter((option) =>
                  searchText ? new RegExp(`${searchText}*`, 'i').test(option.displayName) : option
                )
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
                    key={option.value}
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
