import { useContext } from "react";
import { Banner } from "./componentes/Banner";
import { Time } from "./componentes/Times";
import Footer from "./componentes/Footer";
import { Formulario } from "./componentes/Formulario";
import { OrganoContext } from "./Context";

function App() {
  const { collaborators, teams } = useContext(OrganoContext);

  return (
    <div className="App">
      <Banner
        src="/imagens/banner.png"
        alt="Banner principal da página do Organo"
      />
      <Formulario />
      {teams.map((e, index) => (
        <>
          <Time
            key={index}
            nome={e.nome}
            corPrimaria={e.corPrimaria}
            colaboradores={collaborators.filter(
              (collaborator) => collaborator.time === e.nome
            )}
          />
        </>
      ))}
      <Footer />
    </div>
  );
}

export default App;
