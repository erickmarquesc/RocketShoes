import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;

  @media (min-width: 768px) {
    margin: 50px 0;
  }

  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 32px;

      @media (min-width: 768px) {
        height: auto;
      }
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    display: none;

    @media (min-width: 480px) {
      display: block;
      text-align: right;
      margin-right: 10px;
    }

    strong {
      display: block;
      color: #E1E1E6;
    }

    span {
      font-size: 12px;
      color: #8D8D99;
    }
  }

  svg {
    color: #00B37E;
    transition: color 0.2s, filter 0.2s;
    filter: drop-shadow(0 0 6px rgba(0, 179, 126, 0.5));
  }

  &:hover svg {
    color: #00875F;
    filter: drop-shadow(0 0 10px rgba(0, 179, 126, 0.8));
  }
`;
