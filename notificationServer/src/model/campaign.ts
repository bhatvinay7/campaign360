import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Campaign extends Document {
  campaignName:string,
  user:mongoose.Types.ObjectId,
  campaignId:string,
  campaignDetail:string,
  discount:number
  payoutAmout:number,
  coins:number,
  newUserBonus:number,
  endDate:Date,
  startDate:Date,
  isLive:boolean,
  typeOfReward:string
  isPublished:boolean,
  delete:boolean,
  createdAt?: Date;
  updatedAt?: Date;
}

const campaignSchema = new Schema<Campaign>(
  {
    campaignName:{type:String},
    campaignDetail:{type:String},
    discount:{type:Number},
    coins:{type:Number,default:0},
    payoutAmout:{type:Number,default:0},
    newUserBonus:{type:Number,default:0},
    typeOfReward:{type:String},
    isLive:{type:Boolean,default:false},
    endDate:{
        type:Date
    },
    startDate:{
      type:Date
  },
  isPublished:{type:Boolean,default:false},
   delete:{type:Boolean,default:false},
    campaignId:{type:String},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Client",required:false },
    

  },
  { timestamps: true }
);

const campaign = models.Campaign || model<Campaign>("Campaign",campaignSchema);

export default campaign;
