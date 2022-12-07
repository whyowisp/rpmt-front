import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './reducers/characterReducer'
import loggedPlayerReducer from './reducers/loggedPlayerReducer'
import playersReducer from './reducers/playersReducer'

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    player: loggedPlayerReducer,
    players: playersReducer,
  },
})
