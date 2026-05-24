import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #202024;
  border-radius: 8px;
  border: 1px solid #29292E;
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RightColumn = styled.div`
  width: 100%;
  border-top: 1px solid #29292E;
  padding-top: 32px;

  @media (min-width: 1024px) {
    width: 440px;
    flex-shrink: 0;
    border-top: none;
    padding-top: 0;
    border-left: 1px solid #29292E;
    padding-left: 40px;
  }

  footer {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    button {
      width: 100%;
      background: linear-gradient(135deg, #00875F, #00B37E);
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 14px 20px;
      font-weight: bold;
      font-size: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: filter 0.2s, box-shadow 0.2s;

      &:hover:not(:disabled) {
        filter: brightness(1.1);
        box-shadow: 0 0 16px rgba(0, 179, 126, 0.45);
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        filter: none;
        box-shadow: none;
      }
    }
  }
`;

export const ProductList = styled.div`
  .list-header {
    display: none;
  }

  @media (min-width: 768px) {
    .list-header {
      display: grid;
      grid-template-columns: 100px 1fr 140px 120px 40px;
      column-gap: 16px;
      padding: 0 0 12px;
      border-bottom: 1px solid #29292E;
      margin-bottom: 4px;

      span {
        color: #8D8D99;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.5px;
        padding: 0 6px;

        &:nth-child(3), &:nth-child(4) { text-align: center; }
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;

  span {
    color: #8D8D99;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  strong {
    font-size: 28px;
    color: #00B37E;
  }
`;
