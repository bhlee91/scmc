import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist"

const initialState = {
  contents: []
}

const cargoImageSlice = createSlice({
  name: 'cargoImage',
  initialState,
  reducers: {
    SET_IMAGE(state, action) {
      if (state.contents.length > 0) {
        state.contents.forEach((obj) => {
          if (obj.seq === action.payload.seq) {
            obj.content = action.payload.content
            return
          }
        })

        state.contents.push(
          {
            seq: action.payload.seq,
            content: action.payload.content
          }
        )

      } else {
        state.contents.push(
          {
            seq: action.payload.seq,
            content: action.payload.content
          }
        )
      }
    },
    REMOVE_IMAGE(state, action) {
      state.contents = state.contents.filter(obj => obj.seq = action.payload.seq)
    },
    RESET(state) {
      state.contents = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default cargoImageSlice;