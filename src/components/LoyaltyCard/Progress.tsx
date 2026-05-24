import { useLoyaltyCard } from './context';
import {
  ProgressFill,
  ProgressLabel,
  ProgressSection,
  ProgressTrack,
  RemainingText,
} from './styles';

export function LoyaltyCardProgress() {
  const { loyaltyCount, progress, discountActivated } = useLoyaltyCard();
  const remaining = 10 - loyaltyCount;

  return (
    <>
      {discountActivated ? (
        <RemainingText>
          <strong>10</strong> de 10 — cartão completo!
        </RemainingText>
      ) : (
        <RemainingText>
          <strong>{remaining}</strong>
          {remaining === 1 ? ' compra restante' : ' compras restantes'}
        </RemainingText>
      )}

      <ProgressSection>
        <ProgressTrack>
          <ProgressFill $percent={progress} />
        </ProgressTrack>
        <ProgressLabel>{loyaltyCount} de 10</ProgressLabel>
      </ProgressSection>
    </>
  );
}
