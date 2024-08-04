import { useContext, useState } from "react";
import { Botao } from "../Botao";
import "./index.css";
import { ListaSuspensa } from "../ListaSuspensa";
import { OrganoContext } from "../../Context";

interface DeleteTeamProps {
  times: string[];
  closeForm: () => void;
}

export const DeleteTeamFormulario = ({ times, closeForm }: DeleteTeamProps) => {
  const [nomeDeleteTime, setNomeDeleteTime] = useState("");
  const { onDeleteTeam } = useContext(OrganoContext);

  const aoDeletarTime = (e: any) => {
    closeForm();
    e.preventDefault();
    onDeleteTeam(nomeDeleteTime ? nomeDeleteTime : times[0]);
    setNomeDeleteTime("");
  };

  return (
    <form onSubmit={aoDeletarTime}>
      <h2>Preecha os dados para deletar um time</h2>
      <ListaSuspensa
        itens={times}
        label="Time"
        onChange={(e) => setNomeDeleteTime(e)}
        value={nomeDeleteTime}
      />
      <div className="buttons">
        <Botao>CONFIRMAR</Botao>
        <Botao onClick={closeForm}>FECHAR</Botao>
      </div>
    </form>
  );
};
