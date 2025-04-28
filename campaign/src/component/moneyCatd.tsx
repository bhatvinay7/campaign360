import { BadgeIndianRupee } from 'lucide-react';
import ScratchCard from '@/component/scratchCard';
import {useState,useEffect} from 'react'
import axios from '@/lib/axios'
import {useDispatch} from 'react-redux'
import {responseMessage} from '@/lib/redux/responseSlice'
const MoneyCard = ({money,id}:{money:number,id:string}) => {
    const dispatch=useDispatch()
   const [typeOfReward,setTypeOfReward]= useState<string>("payoutAmount")
   const [isProcessing,setIsProcessing]=useState<boolean>(false)
 
    useEffect(()=>{

    },[])

    async function handleClaim(){
        try{
            setIsProcessing(true)
   const response=await axios.patch(`/api/updateUserReward?typeOfReward=${typeOfReward}&id=${id}`)
   dispatch(responseMessage(response.data.message))
         setIsProcessing(false)
        }
        catch(error:any){

        }
        finally{
            setIsProcessing(false)
            setTimeout(()=>{
                dispatch(responseMessage(""))
            },5000)
        }
    }
  return (
    <ScratchCard width={window.innerWidth <420 ?180 :240} height={window.innerWidth <420 ?120 :160} onComplete={() => {}}>
      <div className="flex flex-col group justify-center animate-pulse items-center h-full bg-white text-green-600">
        <BadgeIndianRupee className="group-hover:scale-105" size={40} />
        <h2 className="text-xl font-bold mt-2">{`₹${money}`}</h2>
        <button onClick={()=>handleClaim()} type="button" className="text-sm px-3 py-1.5 text-white mt-2.5  rounded-2xl bg-slate-700 hover:bg-slate-700/75 border border-gray-600">Claim Your Reward</button>
      </div>
    </ScratchCard>
  );
};

export default MoneyCard;
