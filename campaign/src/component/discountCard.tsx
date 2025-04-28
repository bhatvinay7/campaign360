// components/RewardCard.tsx
import { Gift } from 'lucide-react';
import ScratchCard from '@/component/scratchCard';

const RewardCard = ({discount,id,coupan}:{discount:number,id:string,coupan:string}) => {
  return (
    <ScratchCard  width={window.innerWidth <420 ?180 :240} height={window.innerWidth <420 ?120 :160} onComplete={() => {}}>
      <div  className="flex flex-col justify-center animate-pulse items-center h-full  text-gray-200">
        <Gift size={40} />
        <h2 className="text-xl font-bold mt-2">{`${discount}% OFF`}</h2>
        <p className="text-sm">{`Coupon Code: ${coupan}`}</p>
      </div>
    </ScratchCard>
  );
};

export default RewardCard;
