import * as React  from 'react';
import { Link } from 'gatsby';
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
  padding: 20px 30px;
  border-top: 1px solid #d4d4d4;
  background: #fff;
  color: #505050;
  font-size: 11px;
  width: 100%;
  display: flex;
`
const IconList = styled.ul`
  list-style: none;
  margin-left: auto;
  & > li {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        Copyright {new Date().getFullYear()} All Right Reserved by Kangho Lee
        <IconList>
          <li>github</li>
          <li>twitter</li>
        </IconList> 
      </Container>
    );
  }
}

