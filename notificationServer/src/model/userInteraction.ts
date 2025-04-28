import mongoose, { Schema, Document, model, models } from "mongoose";

export interface userInteraction extends Document {
  
  user:mongoose.Types.ObjectId,
  time:string
  createdAt?: Date;
  updatedAt?: Date;
}

const InteractionSchema = new Schema<userInteraction>(
  {
   user:{type:mongoose.Schema.Types.ObjectId, ref: "Client",required:true},
   time:{type:String}
  },
  { timestamps: true }
);

const Userinteraction = models.Userinteraction || model<userInteraction>("Userinteraction",InteractionSchema);

export default Userinteraction
