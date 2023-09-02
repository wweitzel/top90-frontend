interface InputProps {
  label: string;
  placeholder: string;
  value?: number | string;
  onInput: (event: string) => void;
}

function Input({label, placeholder, value, onInput}: InputProps) {
  return (
    <div className="w-[100%]">
      <label className="form-label">{label}</label>
      <div className="shadow-sm rounded-full">
        <input
          className="form-control rounded-full"
          placeholder={placeholder}
          value={value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
