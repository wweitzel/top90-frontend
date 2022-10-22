function Input({label, placeholder, value, onInput}) {
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
          onInput={(e) => onInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
