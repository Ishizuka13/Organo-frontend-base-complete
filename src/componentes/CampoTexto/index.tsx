import React from "react";

import "./index.css";

interface CampoTextoProps {
  onChange: (valor: string) => void;
  placeholder: string;
  label?: string;
  value: string;
  required?: boolean;
  style?: any;
  type?: string;
}

const CampoTexto = ({
  label,
  style,
  placeholder,
  required,
  type,
  value,
  onChange,
}: CampoTextoProps) => {
  const aoDigitado = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`campo-texto`}>
      <label>{label}</label>
      <input
        style={style}
        value={value}
        onChange={aoDigitado}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </div>
  );
};

export default CampoTexto;
