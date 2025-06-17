import React from 'react'
import styles from './Botoes.module.css'

function Botoes({name, situacao, aoClicar}) {
  return (
    <div>
        <button className={ situacao ? styles.btnSelect : styles.btn} onClick={aoClicar}>{name}</button>
      </div>
  )
}

export default Botoes