import "./index.css";

interface ListaSuspProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange: (e: string) => void;
  itens: string[];
}

interface TypingProps {
  target: {
    value: string;
  };
}

export const ListaSuspensa = ({
  label,
  required,
  value,
  onChange,
  itens,
}: ListaSuspProps) => {
  const onTyping = (e: TypingProps) => {
    onChange(e.target.value);
  };

  return (
    <div className="lista-suspensa">
      <label>{label}</label>
      <select
        required={required}
        onChange={onTyping}
        value={value ? value : itens[0]}
      >
        {itens.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};
