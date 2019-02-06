import React from "react";
import Header from './header';
import Footer from './footer';
import styled from "styled-components";

import '../assets/spoqa-han-sans-kr.css';

const WrapperContainer = styled.div`
  overflow: auto;
`

const Content = styled.main`
  margin-left: auto;
  margin-right: auto;
  min-height: calc(100vh - 60px - 60px);
  max-width: 768px;
  margin-top: 60px;
`

class Layout extends React.Component {
  render() {
    const { location, title, children, author } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    return (
      <WrapperContainer>
        <Header
          title={title}
        ></Header>
        <Content>
          {children}
        </Content>
        <Footer
          author={author}
        >
        </Footer>
      </WrapperContainer>
    )
  }
}

export default Layout
