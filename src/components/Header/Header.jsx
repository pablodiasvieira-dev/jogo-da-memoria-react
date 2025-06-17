import Botoes from '../Botoes/Botoes'
import styles from './Header.module.css'
import React, { useEffect, useState } from 'react'
import NovoJogo from '../NovoJogo/NovoJogo'
import { reiniciarJogo } from '../../redux/jogoSlice'
import {  useDispatch } from 'react-redux'

function Header() {
  const dispatch = useDispatch()
  const [openNovoJogo, setNovoJogo] = useState(false)

  const handleNovoJogo = () => {
    console.log('clicou em novo jogo', openNovoJogo)
    setNovoJogo(!openNovoJogo)
  }

  const handleReiniciarJogo = () =>{
    dispatch(reiniciarJogo())
  }
  return (
    <header className={styles.appHeader}>
      <div><h1>Jogo da Memória</h1></div>
      <div className={styles.canvaBotoes}>
        <Botoes name="Restart" aoClicar={handleReiniciarJogo}/>
        <Botoes name="Novo Jogo" situacao={true}  aoClicar = {handleNovoJogo}/>
      </div>
      {openNovoJogo && (
        <>
          <NovoJogo abrirFechar = {() => setNovoJogo(false) } onConfirmar = {() => setNovoJogo(false)} />
        </>
        ) }
    </header>
  )
}

export default Header