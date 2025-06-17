import { createSlice } from "@reduxjs/toolkit";

function gerarJogadores(jogadores){
    const listaJogadores = []
    for (let i =1 ; i <= jogadores; i++){
        listaJogadores.push(i)
    }
    const arrayJogadores = listaJogadores.map((valor, index) => ({
        id: index+1, 
        score: 0
    }))
    return arrayJogadores
}

function gerarGridAleatorio(cartas, jogadores) {
    const valores = [];
    const numeros = cartas*cartas/2
    for (let i = 1; i <= numeros ; i++) {
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

const EstadoInicial = {
    grid: gerarGridAleatorio(4, 0),
    cartas: 4,
    num_jogadores: 2,
    jogadores: [
        {id: 1, score: 0, movimentos: 0},
        {id: 2, score: 0, movimentos: 0},
    ],
    finalizaJogo: false
}

// const initialState = gerarGridAleatorio(4, 0)

const jogosSlice = createSlice({
    name: 'jogo',
    initialState: EstadoInicial,
    reducers: {
        criarNovoJogo: (state, action) => {
            const {cartas, jogadores} = action.payload
            state.cartas = cartas
            state.num_jogadores = jogadores
            state.jogadores = gerarJogadores(jogadores)
            state.grid = gerarGridAleatorio(cartas, jogadores)
            state.finalizaJogo = false
        },
        reiniciarJogo: (state) => {
            state.grid = gerarGridAleatorio(state.cartas, state.num_jogadores)
            state.jogadores = gerarJogadores(state.num_jogadores)
            state.finalizaJogo = false
        },
        atribuiPonto: (state, action) => {
            const {id} = action.payload
            const jogador = state.jogadores.find(j => j.id === id)
            if (jogador) {
                jogador.score += 1
            }
        },
        finalizaJogo: (state) => {
            const totalScore = state.jogadores.reduce((soma, jogador) => soma + jogador.score, 0)
            console.log(totalScore)
            if(state.cartas*2 === totalScore){
                state.finalizaJogo = true
                console.log("jogo finalizado")
            }
        },
        contaMovimentos: (state, action) => {
            const {id} = action.payload
            const jogador = state.jogadores.find( j => j.id === id)
            if( jogador) {
                jogador.movimentos += 1
            }
        }
    }
})

export const {criarNovoJogo, reiniciarJogo, atribuiPonto, finalizaJogo, contaMovimentos} = jogosSlice.actions
export default jogosSlice.reducer