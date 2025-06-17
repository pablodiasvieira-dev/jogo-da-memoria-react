import './App.css';
import Canva from './components/Canva'
import Header from './components/Header/Header';
import PlacarPlayer from './components/Placar'
import { useSelector } from 'react-redux';

function App() {
  const arrayJogadores = useSelector((state) => state.jogo.jogadores)

  return (
    <div className="App">
      <Header />
      <main>
        <Canva />
      </main>

    </div>
  );
}

export default App;
