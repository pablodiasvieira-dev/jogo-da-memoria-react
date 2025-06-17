
import { configureStore } from '@reduxjs/toolkit'
import jogosSlice from './jogoSlice'


export default configureStore({
    reducer: {
        jogo: jogosSlice
    }
})