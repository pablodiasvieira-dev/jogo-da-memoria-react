import React from 'react'
import styles from './Card.module.css'
import clsx from 'clsx'
import { useState } from 'react'

function Card({card, selecionaCarta, fnSelecionaUmaCarta, estaSelecionado}) {
  // card, deve ter a position e value
  
  const handleClick = () => {
    if( card.status !=='cardRevelado') fnSelecionaUmaCarta(card.position)
  }

  return (
    <div 
      id={`card-${card.position}`}
      className={clsx(styles[`${ estaSelecionado ? 'cardSelecionado' : selecionaCarta}`])}
      onClick={handleClick }
    >
      { (estaSelecionado || card.status ==='cardRevelado' ) && card.value}
    </div>
  )
}

export default Card