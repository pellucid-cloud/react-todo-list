import { useAppDispatch } from "@/store/hooks";
import { RemindItemProps, changeItemState } from "@/store/modules/remind";
import { SwapOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
type ChangeStateButtonProps = {
  item: RemindItemProps,
  stateMap: string[]
}
export default function ({item, stateMap}: ChangeStateButtonProps){
  const [state, setState] = useState<boolean>(!!item.state);
  const dispatch = useAppDispatch();
  const clickHandle = () => {
      setState(!state)
      dispatch(changeItemState({
        id: item.id,
        state: +!state
      }))
    }
  return  <Button type="dashed" icon={<SwapOutlined />} onClick={clickHandle}>{stateMap[+state]}</Button>
   
}