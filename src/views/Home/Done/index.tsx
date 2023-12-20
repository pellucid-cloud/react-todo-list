import { useAppSelector } from "@/store/hooks";
import { RemindItemProps, RemindItemState } from "@/store/modules/remind";
import styled from "styled-components";
import { List as AntdList } from 'antd'
import List from "@/components/List";
import { useCallback } from "react";
import { shallowEqual } from "react-redux";

function useReminds() {
  const filterToday = useCallback((arr: RemindItemProps[]) => {
    return arr.filter(item => item.state === RemindItemState.finish)
  }, [])
  const list = useAppSelector((state) => {
    const initial = state.remind.value
    return filterToday(initial)
  }, shallowEqual);
  return list
}

export default function Done() {
  const reminds = useReminds()
  const listRenderItem = (item: RemindItemProps) => {
    return (
      <AntdList.Item key={item.id}>
        <AntdList.Item.Meta description={item.description}></AntdList.Item.Meta>
      </AntdList.Item>
    )
  }

  return (
    <Wrapper>
      <List header='已完成' dataSource={reminds} renderItem={listRenderItem} empty="做点正事吧，巴巴托斯！！" />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`