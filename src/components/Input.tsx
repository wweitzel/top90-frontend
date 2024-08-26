interface Props {
  label: string;
  placeholder: string;
  value?: number | string;
  onInput: (event: string) => void;
  onEnterKeyDown: () => void;
}

function Input({label, placeholder, value, onInput, onEnterKeyDown}: Props) {
  return (
    <div className="w-100">
      <label className="form-label text-muted">{label}</label>
      <input
        className="form-control rounded-pill shadow-sm"
        placeholder={placeholder}
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onEnterKeyDown();
          }
        }}
      />
    </div>
  );
}

export default Input;
