interface Option {
  displayName: string;
  value: number | string;
}

interface SelectProps {
  label?: string;
  options?: Option[];
  value?: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({label, options, value, onChange}: SelectProps) {
  return (
    <div className="form-group w-[100%]">
      <label className="form-label" htmlFor="select">
        {label}
      </label>
      <div className="shadow-sm rounded-full">
        <select
          className="form-select rounded-full"
          name="select"
          id="select"
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
