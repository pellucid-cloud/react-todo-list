import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {LoginProps} from "@/apis/user";

export interface PublicState {
  user: LoginProps | null
}

const initialState: PublicState = {
  user: null
}

export const publicStore = createSlice({
  name: 'public',
  // 数据状态
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginProps>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    }
  }
})
export const {logout, login} = publicStore.actions
export default publicStore.reducer
