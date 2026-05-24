import styled, { keyframes } from 'styled-components';

const cardIn = keyframes`
  from { transform: scale(0.85) translateY(24px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
`;

export const LoyaltyCardContainer = styled.div`
  background: #202024;
  border: 1px solid #29292E;
  border-radius: 16px;
  padding: 28px 24px;
  width: 100%;
  max-width: 520px;
  animation: ${cardIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;

  @media (min-width: 480px) {
    padding: 28px 32px;
  }
`;

export const LoyaltyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;

  h3 {
    font-size: 12px;
    font-weight: 700;
    color: #E1E1E6;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    color: #8D8D99;
    line-height: 1.4;
  }

  span {
    font-size: 11px;
    color: #4A4A57;
    font-family: 'Courier New', monospace;
    white-space: nowrap;
    padding: 4px 10px;
    border: 1px solid #29292E;
    border-radius: 999px;
    flex-shrink: 0;
  }
`;

export const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 20px;

  @media (min-width: 480px) {
    gap: 10px;
  }
`;

interface SlotProps {
  $filled: boolean;
  $isReward: boolean;
}

export const Slot = styled.div<SlotProps>`
  aspect-ratio: 1;
  border-radius: 10px;
  background: ${({ $filled, $isReward }) =>
    $filled
      ? 'rgba(0, 179, 126, 0.1)'
      : $isReward
      ? 'rgba(124, 58, 237, 0.08)'
      : '#29292E'};
  border: 1px solid ${({ $filled, $isReward }) =>
    $filled
      ? 'rgba(0, 179, 126, 0.35)'
      : $isReward
      ? 'rgba(124, 58, 237, 0.35)'
      : '#323238'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RemainingText = styled.p`
  font-size: 14px;
  color: #8D8D99;
  margin-bottom: 10px;

  strong {
    font-size: 26px;
    font-weight: 800;
    color: #E1E1E6;
    margin-right: 6px;
  }
`;

export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  background: #29292E;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: linear-gradient(90deg, #00875F, #7C3AED);
  border-radius: 999px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ProgressLabel = styled.span`
  font-size: 12px;
  color: #8D8D99;
  white-space: nowrap;
`;

export const DiscountBanner = styled.div<{ $variant?: 'moletom' }>`
  margin-top: 20px;
  background: ${({ $variant }) => $variant === 'moletom'
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(124, 58, 237, 0.12))'
    : 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(0, 179, 126, 0.12))'};
  border: 1px solid ${({ $variant }) => $variant === 'moletom'
    ? 'rgba(59, 130, 246, 0.4)'
    : 'rgba(124, 58, 237, 0.4)'};
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 14px;
    color: #E1E1E6;
  }

  span {
    font-size: 12px;
    color: #8D8D99;
  }
`;
