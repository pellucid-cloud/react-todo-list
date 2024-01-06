import { useAppSelector } from "@/store/hooks";
import { RemindItemProps } from "@/store/modules/remind";
import styled from "styled-components";
import { List as AntdList } from 'antd'
import List from "@/components/List";
import { useCallback } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { notFiled } from "@/store/modules/list";

function useReminds(listid: string | undefined) {
  listid = listid || notFiled
  const filterByListId = useCallback((arr: RemindItemProps[]) => {
    return arr.filter(item => item.listId === listid)
  }, [listid])
  const list = useAppSelector((state) => {
    const initial = state.remind.value
    return filterByListId(initial)
  }, shallowEqual);
  return list
}

export default function ItemList() {
  const params = useParams()
  const reminds = useReminds(params.id)
  const listRenderItem = (item: RemindItemProps) => {
    return (
      <AntdList.Item key={item.id}>
        <AntdList.Item.Meta description={item.description}></AntdList.Item.Meta>
      </AntdList.Item>
    )
  }

  return (
    <Wrapper>
      <List header='已完成' dataSource={reminds} renderItem={listRenderItem} empty="空空如也～" />
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