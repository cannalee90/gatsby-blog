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
    color: #4d5256;
  }

  code {
    font-family: 'Spoqa Han Sans', 'Sans-serif';
    background-color: #f3f5f6;
    font-size: 85%;
    padding: .2em .4em;
    border-radius: 3px;
  }

  a {
    color: #4c80f1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  p, li, ui {
    font-size: 17px;
    line-height: 1.9em;
    margin: 0 0 0.5em;
  }

  h1 {
    font-size: 45px;
    font-weight: bold;
  }

  h2 {
    font-size: 36px;
    font-weight: bold;
  }

  h3 {
    font-size: 26px;
    font-weight: bold;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
  }

  small-text {
    font-size: 12px;
    font-weight: normal;
  }

  paragraph {
    font-size: 14px;
    font-weight: normal;
  }

`

const WrapperContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-flow: column;
  background-color: #f4f4f4;
`

const Content = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
  min-width: 940px;
  margin-top: 120px;
  margin-bottom: 60px;
  min-height: calc(100vh - 240px);
  background-color: #fff;
  @media (max-width: 768px) {
    margin-top: 80px;
    min-height: calc(100vh - 200px);
  }
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