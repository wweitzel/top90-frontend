interface Option {
  displayName: string;
  value: number | string;
}

interface SelectProps {
  label: string;
  options?: Option[];
  value?: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({label, options, value, onChange}: SelectProps) {
  return (
    <div className="form-group" style={{width: '100%'}}>
      <label className="form-label" htmlFor="select-league">
        {label}
      </label>
      <div style={{borderRadius: '20px'}} className="shadow-sm">
        <select
          style={{borderRadius: '20px'}}
          className="form-control"
          name="select-league"
          id="select-league"
          value={value}
          onChange={onChange}
        >
          <option value="0">All</option>
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
                <option key={option.value} value={option.value}>
                  {option.displayName}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
