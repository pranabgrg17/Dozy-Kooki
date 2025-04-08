import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    phone: { type: Number },
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel = mongoose.models.user ||  mongoose.model("user",userSchema);
export default userModel;