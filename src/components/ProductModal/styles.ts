import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContainer = styled.div`
  background: #202024;
  border-radius: 12px;
  width: 92vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid #29292E;

  @media (min-width: 768px) {
    width: 800px;
    max-width: 90vw;
    flex-direction: row;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 200px;
  background: #121214;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 45%;
    height: auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 40px 32px;
    gap: 24px;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #E1E1E6;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 28px;
    }
  }

  p {
    color: #8D8D99;
    font-size: 14px;
    line-height: 1.6;
    margin-top: -12px;
  }

  .price-row {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .from-price {
      font-size: 13px;
      color: #8D8D99;
      letter-spacing: 0.3px;

      s {
        color: #4A4A57;
        text-decoration: line-through;
        margin-left: 2px;
      }
    }

    .current-price {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .installment {
      color: #8D8D99;
      font-size: 13px;
    }
  }

  .sizes {
    display: flex;
    flex-direction: column;
    gap: 12px;

    > strong {
      color: #E1E1E6;
      font-size: 14px;
    }

    .size-buttons {
      display: flex;
      gap: 8px;
    }
  }
`;

export const ModalDiscountBanner = styled.div<{ $variant?: 'moletom' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ $variant }) => $variant === 'moletom'
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(124, 58, 237, 0.12))'
    : 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(0, 179, 126, 0.12))'};
  border: 1px solid ${({ $variant }) => $variant === 'moletom'
    ? 'rgba(59, 130, 246, 0.35)'
    : 'rgba(124, 58, 237, 0.35)'};
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #C4C4CC;

  strong {
    color: ${({ $variant }) => $variant === 'moletom' ? '#93C5FD' : '#A78BFA'};
  }
`;

export const OriginalPrice = styled.s`
  font-size: 14px;
  color: #4A4A57;
  text-decoration: line-through;
  align-self: center;
`;

export const PriceBadge = styled.span`
  background: linear-gradient(135deg, #00875F, #00B37E);
  color: #fff;
  padding: 10px 24px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 0.5px;
  box-shadow: 0 0 20px rgba(0, 179, 126, 0.35);
`;

interface SizeButtonProps {
  $selected: boolean;
}

export const SizeButton = styled.button<SizeButtonProps>`
  background: ${({ $selected }) => $selected ? '#00875F' : '#29292E'};
  color: ${({ $selected }) => $selected ? '#fff' : '#C4C4CC'};
  border: 1px solid ${({ $selected }) => $selected ? '#00B37E' : '#323238'};
  border-radius: 999px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;

  &:hover {
    border-color: #00B37E;
    color: #fff;
  }
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #00875F, #00B37E);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  margin-top: auto;
  transition: filter 0.2s, box-shadow 0.2s, opacity 0.2s;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    box-shadow: 0 0 20px rgba(0, 179, 126, 0.4);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: 0;
  color: #8D8D99;
  cursor: pointer;
  padding: 4px;
  line-height: 0;
  transition: color 0.2s;
  z-index: 10;

  &:hover {
    color: #E1E1E6;
  }
`;
