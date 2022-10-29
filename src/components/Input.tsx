interface InputProps {
  label: string;
  placeholder: string;
  value?: number | string;
  onInput: (event: string) => void;
}

function Input({label, placeholder, value, onInput}: InputProps) {
  return (
    <div>
      <label className="form-label" htmlFor="select-league">
        {label}
      </label>
      <div style={{borderRadius: '20px'}} className="shadow-sm">
        <input
          style={{borderRadius: '20px'}}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;