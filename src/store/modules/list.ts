import { findItemIndex } from '@/utils/tools';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface ListState {
  value: ListItemProps[]
}
export const notFiled = 'notFiled'
const initialState: ListState = {
  value: [
    {
      id: notFiled,
      name: '未归档',
      bgColor: '#C3C3C3',
      icon: ''
    }
  ]
}

export const listStore = createSlice({
  name: 'list',
  // 数据状态
  initialState,
  // 同步修改方法
  reducers: {
    addItem(state, action: PayloadAction<ListItemProps>) {
      state.value.push(action.payload)
    },
    updateItem(state, action: PayloadAction<ListItemProps>) {
      const updateIndex = findItemIndex(action.payload, state.value, 'id')
      state.value[updateIndex] = action.payload
    },
    removeItem(state, action: PayloadAction<ListItemProps>) {
      const removeIndex = findItemIndex(action.payload, state.value, 'id')
      state.value.splice(removeIndex, 1)
    },
  }
})

export type ListItemProps = {
  id: string,
  name: string,
  bgColor: string,
  icon: string
}
export const { addItem, updateItem, removeItem } = listStore.actions
export default listStore.reducer