import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Form, Input, Select, TimePicker, Button, Flex, DatePicker, Space } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { RemindItemProps, RemindItemState, addItem, updateItem } from '@/store/modules/remind';
import { createUUID } from '@/utils/crypto';
import dayjs, { Dayjs } from 'dayjs'
import Point from '@/components/Point';
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FlattenOptionData } from "rc-select/lib/interface";
import { BaseOptionType } from "rc-select/lib/Select";
import { notFiled } from '@/store/modules/list';

type ModelType = 'add' | 'update'
type ModelTypeHandleMap = Record<ModelType, (values: RemindItemFormProps, id: string) => ModelTypeHandleMapResult>
type ModelTypeHandleMapResult = {
  item: RemindItemProps,
  action: ActionCreatorWithPayload<RemindItemProps>
}

type RemindItemFormProps = {
  time: Dayjs,
  date: Dayjs,
  id: string,
  listId: string,
  description: string,
  state: RemindItemState
}

const map: ModelTypeHandleMap = {
  add: (values: RemindItemFormProps): ModelTypeHandleMapResult => {
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
  update: (values: RemindItemFormProps, id: string) => {
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
  return ({ initial = {
    id: '',
    description: '',
    listId: notFiled,
    time: dayjs(),
    date: dayjs(),
  }, close }) => {
    const list = useAppSelector(state => state.list.value)
    const dispatch = useAppDispatch();
    const handleFinish = async (values: RemindItemFormProps) => {
      const { item, action } = map[type](values, initial?.id)
      dispatch(action(item))
      close()
    }
    const options = useMemo(() => {
      return list.map(item => ({ label: item.name, value: item.id, color: item.bgColor }))
    }, [list])
    const optionRender = useCallback((option: FlattenOptionData<BaseOptionType>) => {
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
          <Select placeholder='请选择所属列表' options={options} optionRender={optionRender}>
          </Select>
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="时间" name="time"
          initialValue={dayjs(initial.time, 'HH:mm:ss')}>
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="日期" name="date"
          initialValue={dayjs(initial.date, 'YYYY-MM-DD')}>
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
