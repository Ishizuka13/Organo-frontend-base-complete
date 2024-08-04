import { createContext, ReactNode, useEffect, useState } from "react";
import { ColaboradorProps } from "./componentes/Colaborador";
import { TimeCadastroProps } from "./componentes/Times";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface Idata {
  collaborators: ColaboradorProps[];
  teams: TimeCadastroProps[];
  // setCollaborators: () => void;
  // setTeams: () => void;
}

type IDataFunctions = Idata & {
  onFavorite: (id: string) => void;
  onRegisterCollaborator: (colaborador: ColaboradorProps) => void;
  onDeleteCollaborator: (id: string) => void;
  onTeamRegister: (time: TimeCadastroProps) => void;
  onDeleteTeam: (time: string) => void;
};

const initialValues: Idata = {
  collaborators: [],
  teams: [],
};

interface OrganoContextProps {
  children: ReactNode;
}

export const OrganoContext = createContext(initialValues as IDataFunctions);

export const OrganoContextProvider = ({ children }: OrganoContextProps) => {
  const [collaborators, setCollaborators] = useState<ColaboradorProps[]>(
    initialValues.collaborators
  );
  const [teams, setTeams] = useState<TimeCadastroProps[]>(initialValues.teams);
  const server = `http://localhost:3000`;

  useEffect(() => {
    const getCol = async () =>
      await axios
        .get(`${server}/collaborator`)
        .then((response) => response.data)
        .then((dados) => {
          setCollaborators(dados);
        });
    getCol();
  }, []);

  useEffect(() => {
    const getTeams = async () =>
      await axios
        .get(`${server}/teams`)
        .then((response) => response.data)
        .then((dados) => {
          setTeams(dados);
        });
    getTeams();
  }, []);

  const onRegisterCollaborator = async (colaborador: ColaboradorProps) => {
    await axios.post(`${server}/collaborator`, {
      id: uuidv4(),
      favorito: false,
      nome: colaborador.nome,
      cargo: colaborador.cargo,
      img: colaborador.img,
      time: colaborador.time,
    });
    setCollaborators((prevData) => [...prevData, colaborador]);
  };

  const onFavorite = async (id: string) => {
    const copyCollaborators = collaborators.filter((e) => e.id !== id);
    const favoriteColab = collaborators.find((e) => e.id === id);
    await axios.put(`${server}/collaborator/${id}`, {
      ...favoriteColab,
      favorito: !favoriteColab?.favorito,
    });
    if (favoriteColab) {
      const newCollaborator: ColaboradorProps = {
        ...favoriteColab,
        favorito: !favoriteColab?.favorito,
      };
      setCollaborators([...copyCollaborators, newCollaborator]);
    }
  };

  const onDeleteCollaborator = async (id: string) => {
    const newCollaborators = collaborators.filter((e) => e.id !== id);
    await axios.delete(`${server}/collaborator/${id}`);
    setCollaborators(newCollaborators);
  };

  const onTeamRegister = async (team: TimeCadastroProps) => {
    if (
      teams.find(
        (teams) => teams.nome.toLowerCase() === team.nome.toLowerCase()
      )
    ) {
      alert("Time já registrado!");
      return;
    }
    await axios.post(`${server}/teams`, team);
    setTeams((prevData) => [...prevData, team]);
  };

  const onDeleteTeam = (nome: string) => {
    const colaboradorTime = collaborators.find(
      (collaborator) => collaborator.time === nome
    )?.id;
    const team = teams.filter((team) => team.nome === nome)[0].id;
    const newTeam = teams.filter((team) => team.nome !== nome);

    console.log(team);
    if (colaboradorTime !== undefined)
      axios.delete(`${server}/collaborator/${colaboradorTime}`);
    try {
      axios.delete(`${server}/teams/${team}`);
      setTeams(newTeam);
    } catch (err) {
      alert(err);
      return;
    }
  };

  return (
    <OrganoContext.Provider
      value={{
        collaborators,
        teams,
        onFavorite,
        onRegisterCollaborator,
        onDeleteCollaborator,
        onTeamRegister,
        onDeleteTeam,
      }}
    >
      {children}
    </OrganoContext.Provider>
  );
};
