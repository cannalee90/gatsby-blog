import * as React  from 'react';
import { Link } from 'gatsby';
import styled from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
  position: absolute;
  display: flex;
  width: 100%;
  height: 60px;
`

const RootLink = styled.div`
  position: absolute;
  left: 30px;
  font-size: 25px;
  top: 10px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
`

export default class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Container>
        <Link to={`/`}>
          <RootLink>
            {title}
          </RootLink>
        </Link>
      </Container>
    );
  }
}

