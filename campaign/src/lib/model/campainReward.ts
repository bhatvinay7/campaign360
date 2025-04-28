import mongoose, { Schema, Document, model, models } from "mongoose";


export interface CampainReward extends Document {
  campaignId:string,
  refferer:mongoose.Types.ObjectId,
  recipient:mongoose.Types.ObjectId, 
  createdAt?: Date;
  updatedAt?: Date;
}

const campainReward = new Schema<CampainReward>(
  {

  campaignId:{type:String},
  refferer:{
    type:mongoose.Schema.Types.ObjectId,ref:"client"
},
  recipient:{
    type:mongoose.Schema.Types.ObjectId,ref:"client"
}
  
},


  { timestamps: true }
);

const campainRewardModel = models.CampainReward || model<CampainReward>("CampainReward",campainReward);

export default campainRewardModel;
