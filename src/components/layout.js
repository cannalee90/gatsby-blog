import React from "react";
import Header from './header';
import Footer from './footer';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { StaticQuery } from "gatsby";

import '../assets/spoqahansans-kr.css';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Spoqa Han Sans', 'Sans-serif';
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
    return <StaticQuery
      query={
        graphql`
          query {
            site {
              siteMetadata {
                title
                author
              }
            }
          }
        `
      }
      render={(data) => {
        const { title, author } = data.site.siteMetadata;
        return <>
          <WrapperContainer>
            <Header
              title={title}
            ></Header>
            <Content>
              {this.props.children}
            </Content>
            <Footer
              author={author}
            >
            </Footer>
          </WrapperContainer>
          <GlobalStyle></GlobalStyle>
        </>
      }}
    />
  }
}

export default Layout;