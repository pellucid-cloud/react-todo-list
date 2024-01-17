import { ModelContentProps } from '@/utils/hooks/model';
import { useAppDispatch } from '@/store/hooks';
import { Form, Input, Button, Flex, ColorPicker, Upload, UploadFile } from 'antd';
import React, { useMemo, useState } from 'react';
import { ListItemProps, addItem, updateItem } from '@/store/modules/list';
import { createUUID } from '@/utils/crypto';
import { UploadOutlined } from '@ant-design/icons';
import { compressionPicture, fileToDataURL } from '@/utils/pictrue';
import { RcFile } from 'antd/es/upload';
import styled from 'styled-components';
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
    let [icon, setIcon] = useState<UploadFile>();
    const windowURL = window.URL || window.webkitURL;
    const selectFileUrl = useMemo(() => {
      return icon && windowURL.createObjectURL(new Blob([icon as RcFile], {type: icon.type}))
    }, [icon])
    const handleFinish = async (values: any) => {
      const bgColor = typeof values['bgColor'] === 'string' ? values['bgColor'] : values['bgColor'].toHexString()
      values['bgColor'] = bgColor
      values['icon'] = await compressionPicture(icon as RcFile, {type: icon?.type})
      const { item, action } = map[type](values, initial?.id)
      await dispatch(action(item))
      close()
    }
    const uploadProps = {
      path: '',
      accept: 'image/*',
      beforeUpload: async (file: UploadFile) => {
        setIcon(file);
        return false;
      },
      fileList: []
    }
    return (
      <Wrapper>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item rules={[{ required: true }]} label="名称" initialValue={initial?.name} name="name">
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="颜色" name="bgColor" initialValue={initial?.bgColor || '#1677FF'}>
            <ColorPicker showText />
          </Form.Item>
          <Form.Item rules={[{ required: false }]} label="icon" name="icon">
            <Upload {...uploadProps}>
              {
                icon ?
                  <img className='icon' src={selectFileUrl} alt="" /> :
                  <Button icon={<UploadOutlined />}>选择 Icon</Button>
              }
            </Upload>
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
      </Wrapper>

    );
  }
}

const Wrapper = styled.div`
  .icon {
    width: 100px;
    height: 100px;
  }
`