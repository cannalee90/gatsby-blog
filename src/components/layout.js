import React from "react";
import Header from './header';
import Footer from './footer';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
  }

  a {
    color: unset;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`

const WrapperContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-flow: column;
`

const Content = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  margin-top: 60px;
  min-height: calc(100vh - 60px - 60px);
`

class Layout extends React.Component {
  render() {
    const { location, title, children, author } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    return (
      <React.Fragment>
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
        <GlobalStyle></GlobalStyle>
      </React.Fragment>
    )
  }
}

export default Layout
