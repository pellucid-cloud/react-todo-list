import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch } from '@/store/hooks';
import { Form, Input, Button, Flex, ColorPicker } from 'antd';
import React from 'react';
import { ListItemProps, addItem, updateItem } from '@/store/modules/list';
import { createUUID } from '@/utils/crypto';
type ModelType = 'add' | 'update'
type ModelTypeHandleMap = Record<ModelType, Function>
type ModelTypeHandleMapResult = {
  item: ListItemProps,
  action: Function
}
const map: ModelTypeHandleMap = {
  add: (values: any): ModelTypeHandleMapResult => {
    return {
      item: {
        ...values,
        id: createUUID(),
        bgColor: values.bgColor
      },
      action: addItem
    }
  },
  update: (values: any, id: string) => {
    return {
      item: {
        ...values,
        bgColor: values.bgColor,
        id,
      },
      action: updateItem
    }
  }
}
export default function (type: ModelType): React.FC<ModelContentProps<ListItemProps>> {
  return function ({ initial, close }) {
    const dispatch = useAppDispatch();
    const handleFinish = (values: any) => {
      const bgColor = typeof values['bgColor'] == 'string' ? values['bgColor'] : values['bgColor'].toHexString()
      values['bgColor'] = bgColor
      const { item, action } = map[type](values, initial?.id)
      dispatch(action(item))
      close()
    }
    return (
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item rules={[{ required: true }]} label="名称" initialValue={initial?.name} name="name">
          <Input placeholder='请输入名称' />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="颜色" name="bgColor" initialValue={initial?.bgColor || '#1677FF'}>
          <ColorPicker showText />
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