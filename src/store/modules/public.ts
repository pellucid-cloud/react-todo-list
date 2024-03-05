import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {LoginProps} from "@/apis/user";

export interface PublicState {
  user: LoginProps | null,
  openKeys: string[],
}

const initialState: PublicState = {
  user: null,
  openKeys: [],
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
    },
    setOpenKeys(state, action: PayloadAction<string[]>) {
      state.openKeys = action.payload
    }
  }
})
export const {logout, login, setOpenKeys} = publicStore.actions
export default publicStore.reducer
