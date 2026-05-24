import { MdCardGiftcard, MdVerified } from 'react-icons/md';

import { useLoyaltyCard } from './context';
import { Slot, SlotsGrid } from './styles';

export function LoyaltyCardSlots() {
  const { loyaltyCount } = useLoyaltyCard();
  return (
    <SlotsGrid>
      {Array.from({ length: 10 }, (_, i) => {
        const isReward = i === 9;
        const filled = i < loyaltyCount;
        return (
          <Slot key={i} $filled={filled} $isReward={isReward}>
            {filled && !isReward && <MdVerified size={28} color="#00B37E" />}
            {isReward && filled && <MdCardGiftcard size={24} color="#00B37E" />}
            {isReward && !filled && <MdCardGiftcard size={24} color="#4A4A57" />}
          </Slot>
        );
      })}
    </SlotsGrid>
  );
}
