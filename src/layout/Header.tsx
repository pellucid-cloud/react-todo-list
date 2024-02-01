import {Layout} from "antd";
import styled from "styled-components";

const APP_NAME = DotEnv.APP_NAME;

export function Header() {
  return (
    <Wrapper>
      <Layout.Header>
        <header>
          {APP_NAME}
        </header>
      </Layout.Header>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`
