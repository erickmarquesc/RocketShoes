import styled from 'styled-components';

export const FormWrapper = styled.div``;

export const CardVisual = styled.div`
  width: 100%;
  max-width: 360px;
  height: 200px;
  border-radius: 16px;
  padding: 20px 24px;
  margin: 0 auto 28px;

  @media (min-width: 480px) {
    height: 220px;
    padding: 24px 28px;
    margin: 0 auto 32px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  background:
    radial-gradient(ellipse at 25% 60%, rgba(147, 51, 234, 0.8) 0%, transparent 52%),
    radial-gradient(ellipse at 78% 40%, rgba(13, 148, 136, 0.8) 0%, transparent 52%),
    #1a1535;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 16px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  .visa {
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 2px;
    font-style: italic;
  }

  svg {
    opacity: 0.9;
  }
`;

export const CardMiddle = styled.div`
  position: relative;
  z-index: 1;

  .card-number {
    font-size: 18px;
    letter-spacing: 3px;
    font-family: 'Courier New', monospace;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;

  span {
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;

    &.placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      text-transform: none;
      letter-spacing: 0.5px;
    }
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #E1E1E6;
`;

interface InputProps {
  $hasError: boolean;
  $isValid: boolean;
}

export const Input = styled.input<InputProps>`
  background: #121214;
  border: 1px solid ${({ $hasError, $isValid }) =>
    $hasError ? '#E83F5B' : $isValid ? '#00875F' : '#323238'};
  border-radius: 6px;
  padding: 14px 16px;
  color: #E1E1E6;
  font-size: 15px;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: #4A4A57;
  }

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? '#E83F5B' : '#00875F'};
    box-shadow: 0 0 0 3px ${({ $hasError }) =>
      $hasError ? 'rgba(232, 63, 91, 0.15)' : 'rgba(0, 179, 126, 0.15)'};
  }
`;

export const ErrorMsg = styled.span`
  font-size: 12px;
  color: #E83F5B;
`;

export const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #C4C4CC;
  }
`;

export const Disclaimer = styled.p`
  text-align: center;
  font-size: 11px;
  color: #4A4A57;
  line-height: 1.5;
  margin-top: -8px;
`;
