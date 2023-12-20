import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Form, Input, Select, TimePicker, Button, Flex } from 'antd';
import React from 'react';
import { RemindItemProps, RemindItemState, addItem, updateItem } from '@/store/modules/remind';
import { createUUID } from '@/utils/crypto';
import dayjs from 'dayjs'
import moment from '@/utils/moment'
type ModelType = 'add' | 'update'
type ModelTypeHandleMap = Record<ModelType, Function>
type ModelTypeHandleMapResult = {
  item: RemindItemProps,
  action: Function
}
const map: ModelTypeHandleMap = {
  add: (values: any): ModelTypeHandleMapResult => {
    return {
      item: {
        ...values,
        id: createUUID(),
        date: moment().format('YYYY-MM-DD'),
        state: RemindItemState.wait,
      },
      action: addItem
    }
  },
  update: (values: any, id: string) => {
    return {
      item: {
        ...values,
        id,
        date: moment().format('YYYY-MM-DD'),
        state: RemindItemState.wait,
      },
      action: updateItem
    }
  }
}
export default function (type: ModelType): React.FC<ModelContentProps<RemindItemProps>> {
  return function ({ initial, close }) {
    const remindList = useAppSelector(state => state.list.value)
    const dispatch = useAppDispatch();
    const handleFinish = (values: any) => {
      const { item, action } = map[type](values, initial?.id)
      dispatch(action(item))
      close()
    }
    return (
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item rules={[{ required: true }]} label="描述" initialValue={initial?.description} name="description">
          <Input placeholder='请输入描述' />
        </Form.Item>
        <Form.Item rules={[{ required: false }]} label="所属列表" name="list" initialValue={initial?.listId}>
          {/* // TODO: 添加颜色 */}
          <Select placeholder='请选择所属列表'>
            {remindList.map(item =>
              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="时间" name="time" initialValue={initial && dayjs(initial.time, 'HH:mm:ss')}>
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Flex justify='flex-end' align='center' gap='1rem'>
            <Button onClick={close}>取消</Button>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    );
  }
}