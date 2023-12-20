import { useModel } from "@/utils/hooks/model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ListItemProps, notFiled, removeItem } from "@/store/modules/list";
import styled from "styled-components";
import getModel from './Model'
import { List as AntdList, Button, Flex, Modal } from 'antd'
import MyList from "@/components/List";
import { shallowEqual } from "react-redux";
import Point from "@/components/Point";

function uselist() {
  const list = useAppSelector((state) => {
    return state.list.value
  }, shallowEqual);
  return list
}

export default function List() {
  const list = uselist()
  const dispatch = useAppDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const listAddModel = useModel({
    modal,
    title: '添加列表',
    Content: getModel('add'),
  });
  const listUpdateModel = useModel({
    modal,
    title: '修改列表',
    Content: getModel('update'),
  })
  const listDeleteModel = useModel<ListItemProps>({
    modal,
    title: '删除列表',
    Content: '您确认删除该项吗？',
    onSuccess(item) {
      item && dispatch(removeItem(item))
    }
  })
  const getActions = (item: ListItemProps) => [
    <a onClick={() => listUpdateModel.open(item)}>修改</a>,
    <a onClick={() => listDeleteModel.open(item)}>删除</a>,
  ]
  const listRenderItem = (item: ListItemProps) => {
    return (
      <AntdList.Item key={item.id.toString()} actions={item.id === notFiled ? [] : getActions(item)}>
        <AntdList.Item.Meta description={item.name} avatar={<Point color={item.bgColor} />}></AntdList.Item.Meta>
      </AntdList.Item>
    )
  }

  return (
    <Wrapper>
      <Flex justify="flex-end" align="center">
        <Flex>
          <Button onClick={() => listAddModel.open()}>添加</Button>
        </Flex>
      </Flex>
      <MyList header='我的列表' dataSource={list} renderItem={listRenderItem} />
      {contextHolder}
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