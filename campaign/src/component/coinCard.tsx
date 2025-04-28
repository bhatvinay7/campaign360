// components/CoinCard.tsx
import { Coins } from 'lucide-react';
import ScratchCard from '@/component/scratchCard';
import {useState,useEffect} from 'react'
import axios from '@/lib/axios'   
import {useDispatch} from 'react-redux'
import {responseMessage} from '@/lib/redux/responseSlice'
const CoinCard = ({id,coins}:{id:string,coins:number}) => {
    const dispatch=useDispatch()
    const [typeOfReward,setTypeOfReward]= useState<string>("coins")
    const [isProcessing,setIsProcessing]=useState<boolean>(false)
    const [response,setResponse]=useState<{message:string}>({message:""})
    useEffect(()=>{

    },[])

    async function handleClaim(){
        try{

            console.log(id)
   const response=await axios.patch(`/api/getReward?typeOfReward=${typeOfReward}&id=${id}`)
        dispatch(responseMessage(response.data.message))
        }
        catch(error:any){

        }
        finally{
            setTimeout(()=>{
                dispatch(responseMessage(""))
            },5000)
        }
    }

  return (
    <ScratchCard  width={window.innerWidth <420 ?180 :240} height={window.innerWidth <420 ?140 :160} onComplete={() => {}}>
      <div className="flex flex-col justify-center  items-center h-full  text-yellow-600">
        <Coins size={40} />
        <h2 className="text-xl font-bold mt-2">{`+${coins} Coins`}</h2>
        <button onClick={()=>handleClaim()} type="button" className=" text-sm px-1.5 sm:px-3 py-0.5 sm:py-1.5 text-white mt-2.5  rounded-2xl bg-blue-600/75 hover:bg-blue-600/60 border border-gray-600">{!isProcessing ? "Claim Your Reward":"Processing"}</button>
      </div>
    </ScratchCard>
  );
};

export default CoinCard;
