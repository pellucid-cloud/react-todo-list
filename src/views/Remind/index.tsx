import {useModel} from "@/utils/hooks/model";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {RemindItemProps, removeItem} from "@/store/modules/remind";
import styled from "styled-components";
import getModel from './components/Model'
import {List as AntdList, Button, Divider, Flex, Modal, Space} from 'antd'
import List from "@/components/List";
import {shallowEqual} from "react-redux";
import StateRadioGroup from "@/components/StateRadioGroup";

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
  const getOperators = (item: RemindItemProps) => {
    return [
      <a key={0} onClick={() => remindUpdateModel.open(item)}>修改</a>,
      <a key={1} onClick={() => remindDeleteModel.open(item)}>删除</a>
    ]
  }
  const getExtra = (item: RemindItemProps) => <Space split={<Divider type="vertical"/>}>{getOperators(item)}</Space>
  const listRenderItem = (item: RemindItemProps) => {
    return (
      <AntdList.Item key={item.id} extra={getExtra(item)} actions={[<StateRadioGroup {...item} />]}>
        <AntdList.Item.Meta title={item.description} description={item.date}></AntdList.Item.Meta>
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
      <List header='提醒事项' dataSource={reminds} renderItem={listRenderItem}/>
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

  .ant-list-item-action {
    display: flex;
    align-items: center;
  }
`
