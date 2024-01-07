import { useModel } from "@/utils/hooks/model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RemindItemProps, RemindItemState, changeItemState, removeItem } from "@/store/modules/remind";
import styled from "styled-components";
import getModel from './components/Model'
import { List as AntdList, Button, Flex, Modal } from 'antd'
import List from "@/components/List";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import { SwapOutlined } from "@ant-design/icons";

function useReminds() {
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);;
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const delay = tomorrow.valueOf() - now.valueOf();
    // TODO: 为确保精准计时，后期可使用Web Worker优化
    const timer = setTimeout(() => {
      setUpdate(true)
    }, delay);
    return () => clearInterval(timer)
  }, [update])
  const filterToday = useCallback((arr: RemindItemProps[]) => {
    return arr.filter(item => item.date === moment().format('YYYY-MM-DD'))
  }, [])
  const list = useAppSelector((state) => {
    const initial = state.remind.value
    return filterToday(initial)
  }, (objA, objB) => {
    if (update) {
      setUpdate(false)
      return true
    }
    return shallowEqual(objA, objB)
  });
  return list
}

export default function Today() {
  const reminds = useReminds()
  const dispatch = useAppDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const remindAddModel = useModel({
    modal,
    title: '添加今天代办',
    Content: getModel('add'),
  });
  const remindUpdateModel = useModel({
    modal,
    title: '修改今日代办',
    Content: getModel('update'),
  })
  const remindDeleteModel = useModel<RemindItemProps>({
    modal,
    title: '删除今日代办',
    Content: '您确认删除该项吗？',
    onSuccess(item) {
      item && dispatch(removeItem(item))
    }
  })
  const stateMap =useMemo(() => {
    return ['已完成', '未完成']
  }, [])
  const getActions = (item: RemindItemProps) => {
    const [state, setState] = useState<boolean>(!!item.state);
    const clickHandle = () => {
      setState(!state)
      dispatch(changeItemState({
        id: item.id,
        state: +!state
      }))
    }
    return [
      <a onClick={() => remindUpdateModel.open(item)}>修改</a>,
      <a onClick={() => remindDeleteModel.open(item)}>删除</a>,
      <Button type="dashed" icon={<SwapOutlined />} onClick={clickHandle}>{stateMap[+state]}</Button>
    ]
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
      <List header='今日代办' dataSource={reminds} renderItem={listRenderItem} />
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