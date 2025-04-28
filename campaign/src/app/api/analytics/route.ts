import {NextResponse,NextRequest} from 'next/server'
import Campaign from '@/lib/model/campaign'
import User from '@/lib/model/client'
import connect from '@/lib/db'
import Userinteraction from '@/lib/model/userInteraction'

  
  function parseTimeToHour(timeStr: string) {
    const [time, modifier] = timeStr.trim().split(" ");
    let hour = parseInt(time, 10);
  
    if (modifier.toUpperCase() === "PM" && hour !== 12) {
      hour += 12;
    } else if (modifier.toUpperCase() === "AM" && hour === 12) {
      hour = 0;
    }
  
    return hour;
  }
  
  function getInterval(hour: number) {
    if (hour >= 6 && hour < 9) return "6AM–9AM";
    if (hour >= 9 && hour < 12) return "9AM–12PM";
    if (hour >= 12 && hour < 15) return "12PM–3PM";
    if (hour >= 15 && hour < 18) return "3PM–6PM";
    if (hour >= 18 && hour < 21) return "6PM–9PM";
    if (hour >= 21 && hour < 24) return "9PM–12AM";
    if (hour >= 0 && hour < 3) return "12AM–3AM";
    if (hour >= 3 && hour < 6) return "3AM–6AM";
    return null;
  }
  
export async function GET(){
    try{
        const intervals = [
            { time: "6AM–9AM", count: 0 },
            { time: "9AM–12PM", count: 0 },
            { time: "12PM–3PM", count: 0 },
            { time: "3PM–6PM", count: 0 },
            { time: "6PM–9PM", count: 0 },
            { time: "9PM–12AM", count: 0 },
            { time: "12AM–3AM", count: 0 },
            { time: "3AM–6AM", count: 0 },
          ];
 await connect()
        const campaignCount=await Campaign.aggregate([
              {
                $group:{_id:null,count:{$sum:1}}    
              },
              {
                $project:{
                    _id:0,
                    count:1
                }
              }
        ])
          const userCounts = await User.aggregate([
            {
              $match: {
                userType: { $in: ["client", "user"] }
              }
            },
            {
              $group: {
                _id: "$userType",
                count: { $sum: 1 }
              }
            }
          ]);
    
 
        const time =await Userinteraction.find()
       // Assume 'users' is your array of user documents from the database
time.forEach(each => {
    const hour = parseTimeToHour(each.time);
    const interval = getInterval(hour);
  
    if (interval) {
      const intervalObj = intervals.find(i => i.time === interval);
      if (intervalObj) {
        intervalObj.count += 1;
      }
    }
  });
 
console.log(intervals)
    return NextResponse.json({campaignCount:campaignCount[0]?.count,userCount:userCounts,timeIntervals:intervals},{status:200}) 
    }
    catch(error:any){
        return NextResponse.json({message:error.message},{status:500})  
    }
}

