import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Account extends Document {
  balance:number,
  coins:number,
  email:string,
  user:mongoose.Types.ObjectId,
  createdAt?:Date;
  updatedAt?:Date;
}

const userAccountSchema = new Schema<Account>(
  {   
   user: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
   email:{type:String},
   balance:{type:Number,default:0},
   coins:{type:Number,default:0}
  },

  { timestamps: true }

);

const account = models.account || model<Account>("account",userAccountSchema);

export default account;
