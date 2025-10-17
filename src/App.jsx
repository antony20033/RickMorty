import "./App.css";
import rickMortyLogo from "./assets/rick-morty.png";
import Personajes from "./components/Personajes";

function App() {

  return (
    <>
      <div>
        <img src={rickMortyLogo} alt="Rick and Morty" style={{ maxWidth: 300 }} />
      </div>



       <Personajes />
    </>
  );
}

export default App;
