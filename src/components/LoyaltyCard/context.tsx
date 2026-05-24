import { createContext, useContext } from 'react';

export interface LoyaltyCardContextData {
  loyaltyCount: number;
  orderId: string;
  progress: number;
  discountActivated: boolean;
  moletomDiscountActivated: boolean;
}

export const LoyaltyCardContext = createContext<LoyaltyCardContextData>(
  {} as LoyaltyCardContextData
);

export function useLoyaltyCard(): LoyaltyCardContextData {
  return useContext(LoyaltyCardContext);
}
