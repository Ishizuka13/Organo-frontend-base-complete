import { useContext } from "react";
import { Botao } from "../Botao";
import "./index.css";
import { OrganoContext } from "../../Context";

export interface ColaboradorProps {
  id: string;
  nome: string;
  cargo: string;
  img: string;
  corDeFundo?: string;
  favorito?: boolean;
  time?: string;
}

interface ColaboradorFunction {
  nome: string;
  cargo: string;
  img: string;
  corDeFundo: string;
  colaborador: ColaboradorProps;
}

const Colaborador = ({
  nome,
  cargo,
  img,
  corDeFundo,
  colaborador,
}: ColaboradorFunction) => {
  const { onDeleteCollaborator, onFavorite } = useContext(OrganoContext);

  return (
    <div className="colaborador">
      <div className="cabecalho" style={{ backgroundColor: corDeFundo }}>
        <Botao onClick={() => onDeleteCollaborator(colaborador.id)}>del</Botao>

        <Botao onClick={() => onFavorite(colaborador.id)}>
          {colaborador.favorito ? "Favorito" : "FAV"}
        </Botao>
        <img src={img} alt={nome} />
      </div>
      <div className="rodape">
        <h4>{nome}</h4>
        <h5>{cargo}</h5>
      </div>
    </div>
  );
};

export default Colaborador;
