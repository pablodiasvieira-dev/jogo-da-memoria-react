import './App.css';
import Botoes from './components/Botoes/Botoes'
import Canva from './components/Canva'
import PlacarPlayer from './components/Placar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div><h1>Jogo da Memória</h1></div>
        <div className='canvaBotoes'>
          <Botoes name="Restart"/>
          <Botoes name="Novo Jogo" situacao={true}/>
        </div>
      </header>
      <main>
        <Canva />
      </main>
      <footer>
        <PlacarPlayer nomePlayer = "Player 1" scorePlayer={2} selectPlayer={true}/>
        <PlacarPlayer nomePlayer = "Player 2" scorePlayer={3}/>
        <PlacarPlayer nomePlayer = "Player 3" scorePlayer={6}/>
        <PlacarPlayer nomePlayer = "Player 4" scorePlayer={1}/>
      </footer>
    </div>
  );
}

export default App;
