import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

export const playerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlayer(state, action) {
      return action.payload
    },
    clearPlayer() {
      return initialState
    },
  },
})

export const { setPlayer, clearPlayer } = playerSlice.actions

// *** START OF THUNK FUNCTIONS ***

export const login = (credentials) => {
  return async (dispatch) => {
    const player = await loginService.login(credentials)
    dispatch(setPlayer(player))
  }
}

export default playerSlice.reducer