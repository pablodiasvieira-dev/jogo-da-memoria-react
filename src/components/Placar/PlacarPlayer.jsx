import React from 'react'
import styles from './PlacarPlayer.module.css'

function PlacarPlayer({nomePlayer, scorePlayer, selectPlayer, movimentosPlayer}) {
  return (
    <div className={selectPlayer ? styles.playerSelect : styles.placarPlayer }>
      <h5>{nomePlayer} </h5>
      <span>{scorePlayer}</span>
      <p className={styles.movimentos}>#{movimentosPlayer} movimentos</p>
      </div>
  )
}

export default PlacarPlayer