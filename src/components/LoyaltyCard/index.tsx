import { LoyaltyCardRoot } from './Root';
import { LoyaltyCardHeader } from './Header';
import { LoyaltyCardSlots } from './Slots';
import { LoyaltyCardProgress } from './Progress';
import { LoyaltyCardRewardBanner } from './RewardBanner';

const LoyaltyCard = Object.assign(LoyaltyCardRoot, {
  Header: LoyaltyCardHeader,
  Slots: LoyaltyCardSlots,
  Progress: LoyaltyCardProgress,
  RewardBanner: LoyaltyCardRewardBanner,
});

export default LoyaltyCard;
