import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Form, Input, Select, TimePicker, Button, Flex, Space } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { RemindItemProps, RemindItemState, addItem, updateItem, DateFormat, TimeFormat } from '@/store/modules/remind';
import { createUUID } from '@/utils/crypto';
import dayjs from 'dayjs'
import moment from '@/utils/moment'
import Point from '@/components/Point';
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { BaseOptionType } from "rc-select/lib/Select";
import { FlattenOptionData } from "rc-select/lib/interface";
import { notFiled } from "@/store/modules/list";

type ModelType = 'add' | 'update'
type ModelTypeHandleMap = Record<ModelType, (values: RemindItemProps, id: string) => ModelTypeHandleMapResult>
type ModelTypeHandleMapResult = {
  item: RemindItemProps,
  action: ActionCreatorWithPayload<RemindItemProps>
}
const map: ModelTypeHandleMap = {
  add: (values: RemindItemProps): ModelTypeHandleMapResult => {
    return {
      item: {
        ...values,
        id: createUUID(),
        date: moment().format(DateFormat),
        state: RemindItemState.wait,
      },
      action: addItem
    }
  },
  update: (values: RemindItemProps, id: string) => {
    return {
      item: {
        ...values,
        id,
        date: moment().format(DateFormat),
        state: RemindItemState.wait,
      },
      action: updateItem
    }
  }
}
export default function (type: ModelType): React.FC<ModelContentProps<RemindItemProps>> {
  return ({
    initial = {
      id: '',
      time: dayjs(new Date()),
      listId: notFiled,
      description: ''
    }, close
  }) => {
    const list = useAppSelector(state => state.list.value)
    const dispatch = useAppDispatch();
    const handleFinish = async (values: RemindItemProps) => {
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
          initialValue={initial && dayjs(initial.time, TimeFormat)}>
          <TimePicker format={TimeFormat} />
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
