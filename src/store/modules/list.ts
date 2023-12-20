import { DatabaseTwoTone } from '@ant-design/icons';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface listState {
  value: listItemProps[]
}

const initialState: listState = {
  value: []
}

export const listStore = createSlice({
  name: 'list',
  // 数据状态
  initialState,
  // 同步修改方法
  reducers: {
    
  }
})



export type listItemProps = {
  id: string,
  name: string,
  bgColor: string,
  icon: string
}

export default listStore.reducer