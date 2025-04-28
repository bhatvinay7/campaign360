import mongoose, { Schema, Document, model, models } from "mongoose";

export interface CampainRewardStatus extends Document {
  campainId:string,
  isClaimed:boolean,
  typeOfReward:string,
  payableAmount:number,
  coins:number,
  rewardState:string,
  campainReward:mongoose.Types.ObjectId,
  discount:number,
  createdAt?: Date;
  updatedAt?: Date;

}


const campainRewardStateSchema = new Schema<CampainRewardStatus>(
    {
    campainId:{type:String},

    isClaimed:{type:Boolean,default:false},
    payableAmount:{type:Number},
    discount:{type:Number}, 
    coins:{type:Number},
    typeOfReward:{type:String},
    campainReward:{type:mongoose.Schema.Types.ObjectId,ref:"CampainReward"},
    rewardState:{type:String,
      enum:["claim","claimed"],
      default:"claim"}
    },
    { timestamps: true }
  );
  
  const campainStatus = models.CampainRewardStatus || model<CampainRewardStatus>("CampainRewardStatus",campainRewardStateSchema);
  
  export default  campainStatus;
  