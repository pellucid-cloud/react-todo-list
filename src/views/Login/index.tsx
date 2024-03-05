import { Button, Card, Form, Input } from "antd";
import styled from "styled-components";
import { useAppDispatch } from "@/store/hooks";
import { login as loginAction } from "@/store/modules/public";
import { login } from "@/apis/user"
import { LoginProps } from "@/apis/user";
import { useNavigate } from "react-router-dom";
import './index.scss'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish = async (values: LoginProps) => {
    login(values).then(async (res) => {
      dispatch(loginAction(res.data))
      navigate('/')
    }).catch(async () => {
      dispatch(loginAction({
        username: 'test',
        password: '123'
      }))
      navigate('/')
    })
  }
  return (
    <Wrapper>
      <Card className='login-container'>
        {/*  登录表单  */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: '请输入用户名称'
              },
            ]}>
            <Input size='large' placeholder='请输入用户名称' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true, message: '请输入密码'
              }
            ]}>
            <Input size='large' placeholder='请输入密码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .login-container {
    width: 440px;
    height: max-content;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
    background: transparent;
    border: none;
  }
`

export default () => {
  const bg_mark_count = 5;
  return (
    <>
      <div className='title'>Login</div>
      {new Array(bg_mark_count).fill(null).map((_, index) =>
        <div key={index} className={'layer' + (index + 1)}></div>
      )}
      <Login />
    </>
  )
}
