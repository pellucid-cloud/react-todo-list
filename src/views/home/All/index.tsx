import { useAppSelector } from "@/store/hooks";
import { RemindItemProps } from "@/store/modules/remind";
import styled from "styled-components";
import { List as AntdList } from 'antd'
import List from "@/components/List";

function useReminds() {
  const list = useAppSelector((state) => {
    return state.remind.value
  });
  return list
}

export default function Today() {
  const reminds = useReminds()
  const listRenderItem = (item: RemindItemProps) => {
    return (
      <AntdList.Item key={item.id}>
        {item.description}
      </AntdList.Item>
    )
  }

  return (
    <Wrapper>
      <List header='全部任务' dataSource={reminds} renderItem={listRenderItem} />
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