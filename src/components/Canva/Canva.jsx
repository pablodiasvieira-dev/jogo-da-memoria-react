import React, { useEffect, useState } from 'react'
import Card from '../Card'
import styles from './Canva.module.css'

function gerarGridAleatorio() {
  const valores = [];
  for (let i = 1; i <= 8; i++) {
    valores.push(i, i); // dois de cada
  }

  // 2. Embaralha os valores
  for (let i = valores.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valores[i], valores[j]] = [valores[j], valores[i]];
  }

  // 3. Monta o array final com positions de 0 a 15
  const gridJogos = valores.map((valor, index) => ({
    position: index,
    value: valor,
    status: 'cardOculto',
  }));

  return gridJogos;
}

function Canva() {
  const gridJogos = gerarGridAleatorio()

  const [cartasEmSequencia, setCartasEmSequencia] = useState(gridJogos)

  const [agrupaCardSelecionados, setAgrupaCardSelecionados] = useState([])

  const selecionaUmaCarta = (position) => {
    if(agrupaCardSelecionados.length < 2 && !agrupaCardSelecionados.includes(position)) {
      setAgrupaCardSelecionados( (prev) => [...prev, position] )
    }
  }

  useEffect(() => {
    if(agrupaCardSelecionados.length === 2) {
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
        console.log(novasCartasReveladas)
        setCartasEmSequencia(novasCartasReveladas)
      }
      setTimeout(() => {
        setAgrupaCardSelecionados([])
      }, 500);
    }

  },[agrupaCardSelecionados])

  return (
    <div className={styles.canva}>
      <div className={styles.canvaJogo}>
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
    </div>
  )
}

export default Canva