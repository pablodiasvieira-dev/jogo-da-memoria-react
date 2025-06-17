import React, { useEffect, useState } from 'react'
import Card from '../Card'
import styles from './Canva.module.css'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { atribuiPonto, contaMovimentos, finalizaJogo } from '../../redux/jogoSlice'
import PlacarPlayer from '../Placar'
import EndGame from './EndGame/EndGame'

function Canva() {
  const dispatch = useDispatch()
  const dataEstadoRedux = useSelector((state) => state.jogo)
  // const gridJogos = dataEstadoRedux.grid// useSelector((state) => state.jogo.grid)
  const [cartasEmSequencia, setCartasEmSequencia] = useState(dataEstadoRedux.grid)
  const [agrupaCardSelecionados, setAgrupaCardSelecionados] = useState([]) // acumulas os valores das duas cartas
  const [isLoading, setIsLoading] = useState(true)
  // const endGame = useSelector((state) => dataEstadoRedux.finalizaJogo)
  
  const arrayJogadores = dataEstadoRedux.jogadores
  const [jogadorDaVez, setJogadorDaVez] = useState(1)
  // const gridJogos = gerarGridAleatorio()
  // const dispatch = useDispatch()


  const selecionaUmaCarta = (position) => {
    if(agrupaCardSelecionados.length < 2 && !agrupaCardSelecionados.includes(position)) {
      setAgrupaCardSelecionados( (prev) => [...prev, position] )
    }
    
  }
  // useEffect(() => {
  //   setCartasEmSequencia(gridJogos)
  // } ,[gridJogos])

  // useEffect(() => {
  //   // dispatch(criarNovoJogo({cartas: 4, jogadores: 2}))
  // } ,[dispatch])


  useEffect(() => {
    // Simula 1s de carregamento
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setCartasEmSequencia(dataEstadoRedux.grid)
      setAgrupaCardSelecionados([])
      setJogadorDaVez(1)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timeout)
  }, [dataEstadoRedux.grid])

  useEffect(() => {

    if(agrupaCardSelecionados.length === 2) {
      dispatch(contaMovimentos({id: jogadorDaVez}))
      const [posicao1, posicao2] = agrupaCardSelecionados
      const valorDaCarta1 = cartasEmSequencia[posicao1].value
      const valorDaCarta2 = cartasEmSequencia[posicao2].value

      if( valorDaCarta1 === valorDaCarta2 ){
        const novasCartasReveladas = cartasEmSequencia.map( (carta, index) => {
          if( index === posicao1 || index === posicao2){
            return {...carta, status: 'cardRevelado'}
          }
          return carta
        })
        // console.log(novasCartasReveladas)
        setCartasEmSequencia(novasCartasReveladas)
        dispatch(atribuiPonto({id: jogadorDaVez}))
        dispatch(finalizaJogo())
      }else{
        let indiceJogador = jogadorDaVez + 1
        if( indiceJogador > arrayJogadores.length ) indiceJogador = 1
        setJogadorDaVez(indiceJogador)
      }
      setTimeout(() => {
        setAgrupaCardSelecionados([])
      }, 500);
    }

  },[agrupaCardSelecionados])

  if (isLoading) {
    return <p>Carregando...</p>
  }
  

  return (
    <>
      <div className={styles.canva}>
        {!dataEstadoRedux.finalizaJogo ? (
          <>
            <p>{`Vez do jogador ${jogadorDaVez}...`}</p>
            <div className={styles.canvaJogo} 
              style={{
                gridTemplateRows: `repeat(${ Math.sqrt(cartasEmSequencia.length)}, 5rem)`,
                gridTemplateColumns: `repeat(${Math.sqrt(cartasEmSequencia.length)}, 5rem)`
              }}>
              {cartasEmSequencia.map( (card, index) => (
                <Card 
                  key={index} 
                  card={card} 
                  // estaSelecionado = {valorA === card.position}
                  estaSelecionado={agrupaCardSelecionados.includes(card.position)}
                  selecionaCarta={card.status} 
                  fnSelecionaUmaCarta={selecionaUmaCarta}
                />
              ))}
            </div>
          </>
        ) : (<EndGame jogadores={arrayJogadores} />) }
      </div>
            <footer>
            {arrayJogadores.map( (jogador, index) => (
              <PlacarPlayer 
                key={index} 
                nomePlayer = {`Jogador ${jogador.id}`} 
                scorePlayer={jogador.score} 
                selectPlayer = {jogador.id === jogadorDaVez}
                movimentosPlayer = {jogador.movimentos > 0 ?  jogador.movimentos : "" }
                />
            ))}
            {/* <PlacarPlayer nomePlayer = "Player 3" scorePlayer={6} selectPlayer={true}/> */}
    
          </footer>
    </>
  )
}


export default Canva