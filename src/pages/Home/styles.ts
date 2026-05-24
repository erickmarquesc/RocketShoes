import styled from 'styled-components';

interface FilterButtonProps {
  $active: boolean;
}

export const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }

  .group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .label {
    font-size: 12px;
    color: #8D8D99;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 4px;
  }
`;

export const FilterButton = styled.button<FilterButtonProps>`
  background: ${({ $active }) => $active ? '#00875F' : '#202024'};
  color: ${({ $active }) => $active ? '#fff' : '#C4C4CC'};
  border: 1px solid ${({ $active }) => $active ? '#00B37E' : '#323238'};
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #00B37E;
    color: #fff;
    ${({ $active }) => $active && 'box-shadow: 0 0 10px rgba(0, 179, 126, 0.35);'}
  }
`;

export const DiscountBanner = styled.div<{ $variant?: 'moletom' }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ $variant }) => $variant === 'moletom'
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(124, 58, 237, 0.12))'
    : 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(0, 179, 126, 0.12))'};
  border: 1px solid ${({ $variant }) => $variant === 'moletom'
    ? 'rgba(59, 130, 246, 0.35)'
    : 'rgba(124, 58, 237, 0.35)'};
  border-radius: 10px;
  padding: 12px 18px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #E1E1E6;

  span {
    font-size: 18px;
  }

  strong {
    color: ${({ $variant }) => $variant === 'moletom' ? '#93C5FD' : '#A78BFA'};
  }
`;

export const DiscountBadge = styled.span<{ $variant?: 'moletom' }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ $variant }) => $variant === 'moletom'
    ? 'linear-gradient(135deg, #3B82F6, #7C3AED)'
    : 'linear-gradient(135deg, #7C3AED, #DB2777)'};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: 0.5px;
  box-shadow: ${({ $variant }) => $variant === 'moletom'
    ? '0 0 12px rgba(59, 130, 246, 0.45)'
    : '0 0 12px rgba(124, 58, 237, 0.45)'};
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  list-style: none;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  li {
    display: flex;
    flex-direction: column;
    background: #202024;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #29292E;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20%;
      right: 20%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00B37E, #00875F, transparent);
      opacity: 0;
      transition: opacity 0.4s, left 0.4s, right 0.4s;
    }

    &:hover {
      transform: translateY(-5px);
      border-color: rgba(0, 179, 126, 0.35);
      box-shadow:
        0 0 20px rgba(0, 179, 126, 0.12),
        0 8px 32px rgba(0, 0, 0, 0.5);

      &::before {
        opacity: 1;
        left: 5%;
        right: 5%;
      }
    }

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #E1E1E6;
      margin-top: 5px;
    }

    .price-area {
      margin: 5px 0 20px;

      s {
        display: block;
        font-size: 13px;
        color: #4A4A57;
        text-decoration: line-through;
        margin-bottom: 2px;
      }

      > span {
        font-size: 21px;
        font-weight: bold;
        color: #00B37E;
      }
    }

    button {
      background: linear-gradient(135deg, #00875F, #00B37E);
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: filter 0.2s, box-shadow 0.2s;

      &:hover {
        filter: brightness(1.1);
        box-shadow: 0 0 16px rgba(0, 179, 126, 0.45);
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.2);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
        font-size: 13px;
        letter-spacing: 0.5px;
        color: #fff;
      }
    }
  }
`;
