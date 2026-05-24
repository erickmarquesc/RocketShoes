import styled, { keyframes } from 'styled-components';

const confettiFall = keyframes`
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  80%  { opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
`;

const cardIn = keyframes`
  from { transform: scale(0.85) translateY(24px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
`;

const checkPop = keyframes`
  from { transform: scale(0); }
  to   { transform: scale(1); }
`;

const gradientShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const ConfettiWrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

export const ConfettiPiece = styled.span`
  position: absolute;
  top: -20px;
  animation-name: ${confettiFall};
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-duration: var(--duration, 3s);
  animation-delay: var(--delay, 0s);
`;

export const SuccessWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 0 48px;
`;

export const SuccessCard = styled.div`
  background: #202024;
  border: 1px solid #29292E;
  border-radius: 16px;
  padding: 40px 32px 36px;
  width: 100%;
  max-width: 520px;
  text-align: center;
  animation: ${cardIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;

  @media (min-width: 480px) {
    padding: 48px 40px 40px;
  }
`;

export const CheckCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00875F, #00B37E);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 0 40px rgba(0, 179, 126, 0.5);
  animation: ${checkPop} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
`;

export const SuccessTitle = styled.h1`
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(135deg, #00B37E, #7C3AED, #DB2777, #00B37E);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 4s ease infinite;
  margin-bottom: 10px;

  @media (min-width: 480px) {
    font-size: 34px;
  }
`;

export const SuccessSubtitle = styled.p`
  color: #C4C4CC;
  font-size: 15px;
  line-height: 1.6;

  strong {
    color: #E1E1E6;
    font-weight: 700;
  }
`;

export const OrderIdBadge = styled.div`
  display: inline-block;
  background: #29292E;
  border: 1px solid #323238;
  border-radius: 999px;
  padding: 8px 20px;
  font-size: 13px;
  color: #8D8D99;
  margin-top: 20px;

  strong {
    color: #E1E1E6;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }
`;

export const ContinueButton = styled.button`
  background: linear-gradient(135deg, #00875F, #00B37E);
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 16px 48px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: filter 0.2s, box-shadow 0.2s;
  animation: ${cardIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 24px rgba(0, 179, 126, 0.5);
  }
`;
