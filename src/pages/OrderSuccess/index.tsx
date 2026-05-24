import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MdCheck } from 'react-icons/md';

import LoyaltyCard from '../../components/LoyaltyCard';
import {
  ConfettiWrapper,
  ConfettiPiece,
  SuccessWrapper,
  SuccessCard,
  CheckCircle,
  SuccessTitle,
  SuccessSubtitle,
  OrderIdBadge,
  ContinueButton,
} from './styles';

interface SuccessState {
  cardName: string;
  orderId: string;
  loyaltyCount: number;
  discountActivated: boolean;
  moletomDiscountActivated: boolean;
}

const CONFETTI_COLORS = [
  '#00B37E', '#00875F', '#7C3AED', '#DB2777',
  '#F59E0B', '#3B82F6', '#F97316', '#EC4899',
];

const OrderSuccess = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation<SuccessState>();
  const state = location.state;

  const pieces = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4.5,
        duration: 2.5 + Math.random() * 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: Math.round(6 + Math.random() * 8),
        isCircle: Math.random() > 0.5,
      })),
    []
  );

  if (!state?.orderId) {
    history.replace('/');
    return <></>;
  }

  const { cardName, orderId, loyaltyCount, discountActivated, moletomDiscountActivated } = state;

  return (
    <>
      <ConfettiWrapper aria-hidden="true">
        {pieces.map(p => (
          <ConfettiPiece
            key={p.id}
            style={{
              left: `${p.left}%`,
              '--delay': `${p.delay}s`,
              '--duration': `${p.duration}s`,
              background: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.isCircle ? '50%' : '2px',
            } as React.CSSProperties}
          />
        ))}
      </ConfettiWrapper>

      <SuccessWrapper>
        <SuccessCard>
          <CheckCircle>
            <MdCheck size={40} color="#fff" />
          </CheckCircle>

          <SuccessTitle>Pedido realizado!</SuccessTitle>

          <SuccessSubtitle>
            Olá, <strong>{cardName}</strong>! Seu pedido foi confirmado com sucesso.
          </SuccessSubtitle>

          <OrderIdBadge>
            ID do pedido: <strong>{orderId}</strong>
          </OrderIdBadge>
        </SuccessCard>

        <LoyaltyCard
          loyaltyCount={loyaltyCount}
          orderId={orderId}
          discountActivated={discountActivated}
          moletomDiscountActivated={moletomDiscountActivated}
        >
          <LoyaltyCard.Header />
          <LoyaltyCard.Slots />
          <LoyaltyCard.Progress />
          <LoyaltyCard.RewardBanner />
        </LoyaltyCard>

        <ContinueButton onClick={() => history.push('/')}>
          Continuar comprando
        </ContinueButton>
      </SuccessWrapper>
    </>
  );
};

export default OrderSuccess;
