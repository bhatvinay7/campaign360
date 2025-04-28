import {NextResponse,NextRequest} from 'next/server'
import Campaign from '@/lib/model/campaign'
import campaignRewardStatus from '@/lib/model/campainRewardStatus'
import campaign from '@/lib/model/campaign';
import connect from '@/lib/db'
export async function GET(req:NextRequest){
    try{
        await connect()
        const campaignData = await campaignRewardStatus.aggregate([
            {
              $lookup: {
                from: 'campaigns',
                localField: 'campainId',
                foreignField: 'campaignId',
                as: 'campaignData'
              }
            },
            { $unwind: '$campaignData' },
          
            {
              $lookup: {
                from: 'campainrewards',
                localField: 'campainReward',
                foreignField: '_id',
                as: 'reward'
              }
            },
            { $unwind: '$reward' },
          
            {
              $lookup: {
                from: 'clients',
                localField: 'reward.recipient',
                foreignField: '_id',
                as: 'user'
              }
            },
            { $unwind: '$user' },
             
            {
              $group: {
                _id: '$campainId',
                campaignName: { $first: '$campaignData.campaignName' },
                isLive: { $first: '$campaignData.isLive' },
                totalAmount: {
                  $sum: {
                    $cond: [
                      { $eq: ['$typeOfReward', 'payoutAmount'] },
                      '$payoutAmount',
                      0
                    ]
                  }
                },
                userCount: {
                  $sum: {
                    $cond: [
                      { $eq: ['$user.userType', 'user'] },
                      1,
                      0
                    ]
                  }
                },
                clientCount: {
                  $sum: {
                    $cond: [
                      { $ne: ['$user.userType', 'user'] },
                      1,
                      0
                    ]
                  }
                }
              }
            }
          ]);
          
          console.log(campaignData)
          return NextResponse.json(campaignData,{status:200})
    }
    catch(error:any){
        return NextResponse.json({message:error.message},{status:500})
    }
}