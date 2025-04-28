"use client"

import { useState,useEffect } from "react"
import axios from '@/lib/axios'

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis,YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


import React from 'react'
import campaign from "@/lib/model/campaign"

export default function Analytics() {
  
  const [data,setData]=useState({campaignCount:0,userCount:{clientCount:0,userCount:0},interval:[]})
  const [campaignData,setCampaignData]=useState<campaignData[]>()
  useEffect(()=>{
    async function fetch(){
      const response=await axios.get('/api/analytics')
      const info={campaignCount:response.data?.campaignCount,interval:response?.data?.timeIntervals}
      const user={userCount:0,clientCount:0} 
      response?.data?.userCount?.forEach((each:any)=>{
        if(each._id=="client"){
          user.clientCount=each.count
        }
        if(each._id==="user"){
          user.userCount=each.count
        }
        
      })
     setData({...info,userCount:user})
     
    }
    fetch()
  },[])

  useEffect(()=>{
    async function fetch(){
      try{
        const  response=await axios.get('/api/analytics/campaignData')
        setCampaignData(response.data)
         console.log(response.data)
      }
      catch(error:any){
        console.log(error.message)
      }

    }
    fetch()
  },[])
  
  
  console.log(data)
  
      const chartConfig3 = {
        desktop: {
          label: "clients",
          color: "#ADD8E6",
          
        },
      } satisfies ChartConfig
      

      
      const chartConfigForClient = {
        visitors: {
          label: "Clients",
        },
        safari: {
          label: "Safari",
          color: "#7f5be1",
        },
      } satisfies ChartConfig
      
      const chartDataForClients = [
        { browser: "safari", clients: data.userCount?.clientCount, fill: "var(--color-safari)" },
      ]
      const chartDataForCampaign = [
          { browser: "safari", campaign:data.campaignCount, fill: "var(--color-safari)" },
        ]
      
      const chartConfigForCampaign = {
        visitors: {
          label: "Campaign",
        },
        safari: {
          label: "Safari",
          color: "#7f5be1",
        },
      } satisfies ChartConfig


      const chartDataForClientUserRatio = [
        { browser: "safari", ratio:data.userCount.userCount/(data.userCount.userCount+data.userCount.userCount), fill: "var(--color-safari)" },
      ]
    
    const chartConfigForClientUserRatio = {
      visitors: {
        label: "clientToUserRatio",
      },
      safari: {
        label: "Safari",
        color: "#7f5be1",
      },
    } satisfies ChartConfig




  return (
    <div className='w-full min-h-screen bg-gray-100/80 p-1.5 md:p-4 lg:p-6 mb-4'>
      <div className=" flex flex-col sm:flex-row items-center space-y-1.5 sm:space-y-0 sm:space-x-2 bg-slate-100 w-full justify-center">




      <Card className="flex w-[240px] rounded-sm  bg-slate-50 flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm text-center">Total Number Of Clients</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigForClient}
          className="mx-auto  aspect-square max-h-[140px]"
        >
          <RadialBarChart
            data={chartDataForClients}
            startAngle={0}
            endAngle={250}
            innerRadius={65}
            outerRadius={55}
            className=" rounded-full "
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted  last:fill-background"
              polarRadius={[70, 60]}
            />
            <RadialBar dataKey="Clients" background cornerRadius={4} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl text-indigo-900"
                        >
                          {chartDataForClients[0].clients.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clients
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>

 
    <Card className="flex w-[240px] bg-slate-50 rounded-sm  flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="leading-6 text-center text-sm">Total Number Of Campaigns</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigForCampaign}
          className="mx-auto aspect-square rounded-0 max-h-[140px]"
        >
          <RadialBarChart 
            data={chartDataForCampaign}
            startAngle={0}
            endAngle={250}
            innerRadius={65}
            outerRadius={55}

          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted  last:bg-orange-300  "
              polarRadius={[70, 60]}
            />
            <RadialBar dataKey="campaign" 
            background  cornerRadius={4} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl text-indigo-900"
                        >
                          {chartDataForCampaign[0].campaign.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                         Campaign
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
      </div>
      



      
        <div className="w-full  flex space-x-2 md:flex-row h-auto relative flex-col  sm:items-center border border-black/15   bg-slate-100 rounded-sm mt-2 ">
      
    
   <div className=" lg:w-4/5 md:w-3/5 w-full  md:border-r relative md:border-r-black/15 p-1 sm:p-1 md:p-1.5 ">
    <Card className="bg-slate-100 w-full flex justify-center rounded-sm">
      <CardHeader>
      <CardTitle>User Interaction Based On Time</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig3} className=" max-h-90 text-base  w-full space-y-2 p-1 md:p-4">
          <BarChart
            accessibilityLayer
            data={data?.interval}
            barSize={50}  
         
           barCategoryGap={75}
            layout="vertical"
            margin={{
              right: 16,
            }}
            className=" bg-white rounded-md p-1 md:p-4 !important space-y-3 text-base sm:text-[20px] w-full"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="time"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="time"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
    </div>
    <div className=" w-full sm:max-auto h-auto   md:w-1/4   md:h-auto p-1 sm:p-1 lg:p-1.5 rounded-sm ">

   
    <Card className="  w-full h-auto bg-slate-50 rounded-sm lg:max-h-full  flex-col">
      <CardHeader className="items-center  pb-0">
        <CardTitle className="text-sm text-center">User/Client Conversion Ratio</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfigForClientUserRatio}
          className="mx-auto  w-full h-40 lg:h-full"
        >
          <RadialBarChart
            data={chartDataForClientUserRatio}
            startAngle={0}
            endAngle={250}
            innerRadius={65}
            outerRadius={55}
            className=" rounded-full "
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:bg-blue-500  last:fill-background"
              polarRadius={[70, 60]}
            />
            <RadialBar dataKey="visitors"
            fill="#3b82f6" 
            background={{ fill: "#e0f2fe" }}
             cornerRadius={4} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl text-indigo-900"
                        >
                          {chartDataForClientUserRatio[0].ratio.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xl"
                        >
                         %
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
    </div>
      </div>
      <div className="mt-2 w-full flex flex-col">
        <h1 className="w-full text-xl sm:text-2xl md:text-[22px] text-black font-medium my-2.5">Campaign Details</h1>
        <div className=" overflow-x-scroll">
          <table className="table-auto border-collapse border border-slate-400 w-full">
           <thead>

           <tr className="text-center space-x-1.5 border text-sm border-black/35  text-indigo-950/80 ">
            <th className="border-r border-gray-500  ">
              Campaign Name  
            </th>
            <th className="border-r border-gray-500">
              State
              </th>
            <th className="border-r border-gray-500">
                New Clients
            </th>  
            <th className="border-r border-gray-500">
                New Users
            </th>
            <th className="border-r border-gray-500">
               Total NewUserBonus
            </th>
            <th className="border-r border-gray-500">
               Conversion Ratio
            </th>
           </tr>
           </thead>
          <tbody className=" text-center space-y-2 ">
         {Array.isArray(campaignData) && campaignData?.map((each,index:number)=>{

          return (
            <tr key={index} className=" text-center text-black/60 border border-black/35 ">
            <td className="border-r border-gray-500"> 
               {each.campaignName}
            </td>
            <td className="border-r border-gray-500">
                {each.isLive ?"Ongoing":"expired"}
            </td>
            <td className="border-r border-gray-500">
                {each.clientCount}
            </td>
            <td className="border-r border-gray-500">
              {each.userCount+each.clientCount}
            </td>
            <td className="border-r border-gray-500">
              {each.totalAmount}
            </td>
            <td className="border-r border-gray-500">
              {each.clientCount/(each.userCount+each.clientCount)}
            </td>
        </tr>

          )
         } )}
        
           
           
          </tbody>
          </table>
        </div>
      </div> 
    </div>
  )
}
