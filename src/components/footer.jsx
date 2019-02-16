import * as React  from 'react';
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
  padding: 0 30px;
  border-top: 1px solid #d4d4d4;
  background: #fff;
  color: #505050;
  font-size: 11px;
  width: 100%;
  display: flex;
  align-items: center;
`
const IconList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin-left: auto;
  padding: 0
  & > li {
    display: inline-block;
    font-size: 11px;

    &:not(:last-child) {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`

const Copyright = styled.div`
  & > span.author {
    font-weight: bold;
  }
`


export default class Footer extends React.Component {
  render() {
    const { author } = this.props;
    return (
      <Container>
        <Copyright>
          Copyright {new Date().getFullYear()} All Right Reserved by
          <span className='author'>
            {` ${author}`}
          </span>
        </Copyright>
        <IconList>
          <li>
            <a href="https://github.com/cannalee90">
              github
            </a>
          </li>
          <li>
            <a href="https://twitter.com/unfixed2017">
              twitter
            </a>
          </li>
        </IconList> 
      </Container>
    );
  }
}

