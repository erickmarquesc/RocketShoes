import React, { useEffect, useState } from 'react';

import { LoyaltyCardContext } from './context';
import { LoyaltyCardContainer } from './styles';

interface LoyaltyCardRootProps {
  loyaltyCount: number;
  orderId: string;
  discountActivated: boolean;
  moletomDiscountActivated: boolean;
  children: React.ReactNode;
}

export function LoyaltyCardRoot({
  loyaltyCount,
  orderId,
  discountActivated,
  moletomDiscountActivated,
  children,
}: LoyaltyCardRootProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress((loyaltyCount / 10) * 100), 400);
    return () => clearTimeout(t);
  }, [loyaltyCount]);

  return (
    <LoyaltyCardContext.Provider
      value={{ loyaltyCount, orderId, progress, discountActivated, moletomDiscountActivated }}
    >
      <LoyaltyCardContainer>{children}</LoyaltyCardContainer>
    </LoyaltyCardContext.Provider>
  );
}
