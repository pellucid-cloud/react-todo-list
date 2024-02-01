import {changeItemState, RemindItemProps, RemindItemState} from "@/store/modules/remind";
import {useAppDispatch} from "@/store/hooks";
import {useState} from "react";
import {Radio, RadioChangeEvent} from "antd";

export default function StateRadioGroup({id, state}: RemindItemProps) {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState<number>(state);
  const radios = [
    {
      label: '未完成',
      value: RemindItemState.wait,
    },
    {
      label: '已完成',
      value: RemindItemState.finish,
    }
  ]
  const handleChange = (e: RadioChangeEvent) => {
    setLabel(e.target.value);
    dispatch(changeItemState({
      id,
      state: e.target.value
    }))
  }
  return (
    <Radio.Group onChange={handleChange} value={label}>
      {
        radios.map((radio, index) => (
          <Radio key={index} value={radio.value}>{radio.label}</Radio>
        ))
      }
    </Radio.Group>
  )
}
