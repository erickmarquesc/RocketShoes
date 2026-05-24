import styled from 'styled-components';

export const CartItemRow = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "img  info    remove"
    "img  qty     subtotal";
  column-gap: 14px;
  row-gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #29292E;

  img {
    grid-area: img;
    width: 100%;
    max-height: 80px;
    object-fit: contain;
    align-self: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: 100px 1fr 140px 120px 40px;
    grid-template-rows: auto;
    grid-template-areas: "img info qty subtotal remove";
    align-items: center;
    column-gap: 16px;
    padding: 12px 0;

    img { max-height: 100px; }
  }
`;

export const CartItemInfo = styled.div`
  grid-area: info;
  min-width: 0;

  strong {
    color: #E1E1E6;
    display: block;
    font-size: 14px;
    line-height: 1.4;
  }

  small {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #8D8D99;
  }

  span {
    display: block;
    margin-top: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #00B37E;
  }

  @media (min-width: 768px) {
    strong { font-size: 15px; }
    span   { font-size: 18px; }
  }
`;

export const CartItemQty = styled.div`
  grid-area: qty;
  display: flex;
  align-items: center;
  align-self: center;

  input {
    border: 1px solid #323238;
    border-radius: 4px;
    color: #C4C4CC;
    background: #121214;
    padding: 6px;
    width: 46px;
    text-align: center;
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
    svg { color: #00875F; transition: color 0.2s, filter 0.2s; }
    &:hover svg { color: #00B37E; filter: drop-shadow(0 0 6px rgba(0,179,126,0.6)); }
    &:disabled svg { color: #323238; cursor: not-allowed; filter: none; }
  }

  @media (min-width: 768px) {
    justify-content: center;
  }
`;

export const CartItemSubtotalText = styled.strong`
  grid-area: subtotal;
  align-self: center;
  text-align: right;
  font-size: 15px;
  color: #E1E1E6;

  @media (min-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
`;

export const CartItemRemove = styled.button`
  grid-area: remove;
  background: none;
  border: 0;
  padding: 4px;
  align-self: start;
  justify-self: end;
  svg { color: #00875F; transition: color 0.2s; }
  &:hover svg { color: #00B37E; filter: drop-shadow(0 0 6px rgba(0,179,126,0.6)); }

  @media (min-width: 768px) {
    align-self: center;
    justify-self: center;
  }
`;
