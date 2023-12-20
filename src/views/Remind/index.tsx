import { useModel } from "@/utils/hooks/model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RemindItemProps, RemindItemState, changeItemState, removeItem } from "@/store/modules/remind";
import styled from "styled-components";
import getModel from './Model'
import { List as AntdList, Button, Flex, Modal } from 'antd'
import List from "@/components/List";
import { shallowEqual } from "react-redux";

function useReminds() {
  const list = useAppSelector((state) => {
    return state.remind.value
  }, shallowEqual);
  return list
}

export default function Remind() {
  const reminds = useReminds()
  const dispatch = useAppDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const remindAddModel = useModel({
    modal,
    title: '添加代办',
    Content: getModel('add'),
  });
  const remindUpdateModel = useModel({
    modal,
    title: '修改代办',
    Content: getModel('update'),
  })
  const remindDeleteModel = useModel<RemindItemProps>({
    modal,
    title: '删除代办',
    Content: '您确认删除该项吗？',
    onSuccess(item) {
      item && dispatch(removeItem(item))
    }
  })
  const remindFinishModel = useModel<RemindItemProps>({
    modal,
    title: '完成代办',
    Content: '您确定已经完成了该任务了吗？（该操作不可逆）',
    onSuccess(item) {
      if (item) {
        dispatch(changeItemState({id: item.id, state: RemindItemState.finish}))
      }
    }
  })
  const getActions = (item: RemindItemProps) => {
    const actions = [
      <a onClick={() => remindUpdateModel.open(item)}>修改</a>,
      <a onClick={() => remindDeleteModel.open(item)}>删除</a>
    ]
    if(item.state === RemindItemState.wait){
      actions.push(<a onClick={() => remindFinishModel.open(item)}>完成</a>)
    }
    return actions
  }
  const listRenderItem = (item: RemindItemProps) => {
    return (
      <AntdList.Item key={item.id} actions={getActions(item)}>
        <AntdList.Item.Meta description={item.description}></AntdList.Item.Meta>
      </AntdList.Item>
    )
  }

  return (
    <Wrapper>
      <Flex justify="flex-end" align="center">
        <Flex>
          <Button onClick={() => remindAddModel.open()}>添加</Button>
        </Flex>
      </Flex>
      <List header='提醒事项' dataSource={reminds} renderItem={listRenderItem} />
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