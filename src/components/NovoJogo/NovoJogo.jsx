import React, { useState } from 'react'
import styles from './NovoJogo.module.css'
import Botoes from '../Botoes/Botoes'
// import { useEffect } from 'react'
import { reiniciarJogo } from '../../redux/jogoSlice'

import { useDispatch} from "react-redux"
import { criarNovoJogo } from '../../redux/jogoSlice'

function NovoJogo ({abrirFechar, onConfirmar}) {
  const dispatch = useDispatch()
  const [cartas, setCartas] = useState(4)
  const [jogadores, setJogadores] = useState(2)

  const handleChangeConfigs = (event, tipo) => {
    const valor =  event.target.value
    if(tipo === 'num_cartas') setCartas(valor)
    if(tipo === 'num_jogadores') setJogadores(valor)
  }

  const handleClickBtn = (cartas, jogadores) => {
    const valoresDoNovoJogo = {cartas:  parseInt(cartas), jogadores:  parseInt(jogadores) }
    dispatch(criarNovoJogo(valoresDoNovoJogo))
    dispatch(reiniciarJogo())
    onConfirmar()
    
  }

  // useEffect(() => {
  //   // dispatch(criarNovoJogo(undefined))
  // } ,[dispatch])

  return (
    <div className={styles.canvaNovoJogo} onClick={abrirFechar}>
      <div className={styles.boxNovoJogo} onClick={(e) => e.stopPropagation()}>
        <h2>Criar Novo Jogo</h2>
        <form action="">
          <div className={styles.qtdCartas}>
            <label htmlFor="qtdCartas">Cartas</label>
            <select name="cartas" id="qtdCartas" onChange={ (e) => handleChangeConfigs(e, "num_cartas")} value={cartas}>
              <option value="4">4x4</option>
              <option value="6">6x6</option>
              <option value="8">8x8</option>
            </select>
          </div>
          <div className={styles.qtdJogadores}>
            <label htmlFor="qtdJogadores">Jogadores</label>
            <select name="jogadores" id="qtdJogadores"  onChange={ (e) => handleChangeConfigs(e, "num_jogadores")} value={jogadores}>
              <option value="1">1 (um)</option>
              <option value="2">2 (dois)</option>
              <option value="3">3 (três)</option>
              <option value="4">4 (quatro)</option>
            </select>
          </div>

        </form>
        <div className={styles.confirmar}>
          <Botoes name="Confirmar" situacao={true} aoClicar={() => {handleClickBtn(cartas, jogadores)}}/>
          <Botoes name="Cancelar" aoClicar={abrirFechar}/>
        </div>
      </div>
    </div>
  )
}

export default NovoJogo
