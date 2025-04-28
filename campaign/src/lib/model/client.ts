import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Client extends Document {
  userName: string;
  email: string;
  refreshToken?:string,
  picture?:string,
  mobile?:string,
  isVerified:boolean,
  //user:mongoose.Types.ObjectId,
  userType: string,
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const clientSchema = new Schema<Client>(
  {
    userName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false},
    mobile:{type:String,required:false},
    refreshToken:{type:String,required:false},
    isVerified:{type:Boolean,default:false},
    picture:{type:String,required:false},
  //  user: { type: mongoose.Schema.Types.ObjectId, ref: "Client",required:false },
    userType: {
      type: String,
      enum : ['user'],
      default: 'user'
  },

  },
  { timestamps: true }
);

const client = models.Client || model<Client>("Client",clientSchema);

export default client;
