import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Form, Input, Select, TimePicker, Button, Flex, DatePicker, Space } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { RemindItemProps, RemindItemState, addItem, updateItem } from '@/store/modules/remind';
import { createUUID } from '@/utils/crypto';
import dayjs from 'dayjs'
import { BaseOptionType } from 'antd/es/select';
import Point from '@/components/Point';
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
        state: RemindItemState.wait,
        time: values['time'].format('HH:mm:ss'),
        date: values['date'].format('YYYY-MM-DD')
      },
      action: addItem
    }
  },
  update: (values: any, id: string) => {
    return {
      item: {
        ...values,
        id,
        state: RemindItemState.wait,
        time: values['time'].format('HH:mm:ss'),
        date: values['date'].format('YYYY-MM-DD')
      },
      action: updateItem
    }
  }
}
export default function (type: ModelType): React.FC<ModelContentProps<RemindItemProps>> {
  return function ({ initial, close }) {
    const list = useAppSelector(state => state.list.value)
    const dispatch = useAppDispatch();
    const handleFinish = (values: any) => {
      const { item, action } = map[type](values, initial?.id)
      dispatch(action(item))
      close()
    }
    const options = useMemo(() => {
      return list.map(item => ({ label: item.name, value: item.id, color: item.bgColor }))
    }, [list])
    const optionRender = useCallback((option:any) => {
      return (
        <Space>
          <Point color={option.data.color} />
          <span>{option.label}</span>
        </Space>
      )
    }, [])
    return (
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item rules={[{ required: true }]} label="描述" initialValue={initial?.description} name="description">
          <Input placeholder='请输入描述' />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="所属列表" name="listId" initialValue={initial?.listId}>
          <Select placeholder='请选择所属列表' options={options} optionRender={optionRender} >
          </Select>
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="时间" name="time" initialValue={initial && dayjs(initial.time, 'HH:mm:ss')}>
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="日期" name="date" initialValue={initial && dayjs(initial.date, 'YYYY-MM-DD')}>
          <DatePicker format="YYYY-MM-DD" />
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