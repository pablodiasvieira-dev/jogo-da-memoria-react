import React from 'react'
import styles from './EndGame.module.css'

const EndGame = ({ jogadores }) => {
    if (!jogadores || jogadores.length === 0) return null

    const maioresPontuacoes = Math.max(...jogadores.map(j => j.score))
    const vencedores = jogadores.filter(j => j.score === maioresPontuacoes)

    const mensagemFinal = vencedores.length > 1
    ? "Empate!"
    : `Jogador ${vencedores[0].id} venceu!`

    return (
    <div className={styles.fimDeJogoContainer}>
        <div className={styles.fimDeJogoCard}>
        <h1 className={styles.fimDeJogoTitulo}>🏁 Fim de Jogo</h1>
        <p className={styles.fimDeJogoMensagem}>{mensagemFinal}</p>
        <ul className={styles.ranking}>
            {jogadores.map(jogador => (
            <li key={jogador.id}>
                Jogador {jogador.id} — {jogador.score} ponto{jogador.score !== 1 ? "s" : ""}
            </li>
            ))}
        </ul>
        </div>
    </div>
    )
}

export default EndGame