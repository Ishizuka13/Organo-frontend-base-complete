import React from "react";

import "./index.css";

interface BotaoProps {
  children: string;
  onClick?: () => void | boolean;
}

export const Botao = ({ children, onClick }: BotaoProps) => {
  return (
    <button className={`botao botao-${children}`} onClick={onClick}>
      {children}
    </button>
  );
};
