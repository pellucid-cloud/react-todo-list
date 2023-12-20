import { findItemIndex } from "@/utils/tools"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface remindState {
  value: RemindItemProps[]
}

const initialState: remindState = {
  value: []
}
export const remindStore = createSlice({
  name: 'remind',
  // 数据状态
  initialState,
  // 同步修改方法
  reducers: {
    addItem(state, action: PayloadAction<RemindItemProps>) {
      state.value.push(action.payload)
    },
    updateItem(state, action: PayloadAction<RemindItemProps>) {
      const updateIndex = findItemIndex(action.payload, state.value, 'id')
      state.value[updateIndex] = action.payload
    },
    removeItem(state, action: PayloadAction<RemindItemProps>) {
      const removeIndex = findItemIndex(action.payload, state.value, 'id')
      state.value.splice(removeIndex, 1)
    },
    changeItemState(state, action: PayloadAction<RemindItemChangeStateProps>){
      const changeIndex = findItemIndex(action.payload, state.value, 'id')
      state.value[changeIndex] = {
        ...state.value[changeIndex],
        state: action.payload.state
      }
    }
  }
})
export enum RemindItemState {
  finish,
  wait
}

export type RemindItemProps = {
  id: string,
  listId: string,
  date: string,
  time: string,
  description: string,
  state: RemindItemState
}

export type RemindItemChangeStateProps = {
  id: string,
  state: RemindItemState
}

export const { addItem, updateItem, removeItem, changeItemState } = remindStore.actions
export default remindStore.reducer
