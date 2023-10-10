interface InputProps {
  label: string;
  placeholder: string;
  value?: number | string;
  onInput: (event: string) => void;
  onEnterKeyDown: () => void;
}

function Input({label, placeholder, value, onInput, onEnterKeyDown}: InputProps) {
  return (
    <div style={{width: '100%'}}>
      <label className="form-label text-muted">{label}</label>
      <div style={{borderRadius: '20px'}} className="shadow-sm">
        <input
          style={{borderRadius: '20px'}}
          className="form-control"
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
    </div>
  );
}

export default Input;
