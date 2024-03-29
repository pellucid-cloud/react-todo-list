import { useModel } from "@/utils/hooks/model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RemindItemProps, removeItem } from "@/store/modules/remind";
import styled from "styled-components";
import getModel from './components/Model'
import { List as AntdList, Button, Flex, Modal } from 'antd'
import List from "@/components/List";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import TimerWorker from '@/worker/timer?worker'
import ChangeStateButton from "./components/ChangeStateButton";
import Point from "@/components/Point";
import { ListItemProps } from "@/store/modules/list";

function useTimer() {
  const worker = new TimerWorker()
  return {
    start(timeout: number) {
      return new Promise<void>((resolve) => {
        worker.postMessage({ type: 'start', timeout: timeout });
        worker.addEventListener('message', () => {
          resolve()
        })
      })
    },
    close() {
      worker.postMessage({ type: 'close' });
    }
  }
}

const getTomorrowTime = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.valueOf() - now.valueOf();
}

function useReminds() {
  const [update, setUpdate] = useState(false)
  const { start, close } = useTimer()
  useEffect(() => {
    const timeout = getTomorrowTime()
    start(timeout).then(() => {
      setUpdate(true)
    })
    return close
  }, [update])

  const filterToday = useCallback((reminds: RemindItemProps[], list: ListItemProps[]) => {
    const map: Record<string, ListItemProps> = {}
    // 空间换时间
    list.forEach(item => {
      map[item.id] = item
    })
    return reminds.map(item => {
      // 确保item地址不变化，从而减少不必要的渲染
      const r: RemindItemProps & Partial<ListItemProps> = item
      r.bgColor = map[item.listId].bgColor
      r.name = map[item.listId].name
      return r
    }).filter(item => item.date.includes(moment().format('YYYY-MM-DD')))
  }, [])
  
  const list = useAppSelector((state) => {
    return filterToday(state.remind.value, state.list.value)
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
  const stateMap = useMemo(() => {
    return ['已完成', '未完成']
  }, [])

  const getActions = (item: RemindItemProps) => {
    return [
      <a onClick={() => remindUpdateModel.open(item)}>修改</a>,
      <a onClick={() => remindDeleteModel.open(item)}>删除</a>,
      <ChangeStateButton item={item} stateMap={stateMap} />
    ]
  }
  const listRenderItem = (item: RemindItemProps & Partial<ListItemProps> ) => {
    return (
      <AntdList.Item key={item.id} actions={getActions(item)}>
        <Point color={item?.bgColor} />
        <AntdList.Item.Meta description={item.description + item.bgColor}></AntdList.Item.Meta>
      </AntdList.Item>
    )
  }
  // 模拟加载
  // use(fetchData('/getUser'))
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
