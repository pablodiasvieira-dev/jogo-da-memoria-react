import React from 'react'
import styles from './Botoes.module.css'

function Botoes({name, situacao}) {
  return (
    <div>
        <button className={ situacao ? styles.btnSelect : styles.btn}>{name}</button>
        </div>
  )
}

export default Botoes