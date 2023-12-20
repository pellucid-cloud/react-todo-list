import { findItemIndex } from "@/utils/tools"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface remindState {
  value: RemindItemProps[]
}

const initialState: remindState = {
  value: []
}
export const remindStore = createSlice({
  name: 'list',
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
    changeItemState(state, action: PayloadAction<RemindItemProps>){
      const changeIndex = findItemIndex(action.payload, state.value, 'id')
      state.value[changeIndex].state = action.payload.state
    }
  }
})
/**
 * 0 取消
 * 1 完成
 * 2 待定
 */
export enum RemindItemState {
  cancel = 0,
  finish = 1,
  wait = 2
}

export type RemindItemProps = {
  id: string,
  listId: string,
  date: string,
  time: string,
  description: string,
  state: RemindItemState
}

export const { addItem, updateItem, removeItem, changeItemState } = remindStore.actions
export default remindStore.reducer
