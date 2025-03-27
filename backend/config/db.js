import mongoose, { connect } from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://pranabgurung2735:1234@cluster0.zjrafm1.mongodb.net/dozy_kooki").then(()=>console.log("DB Connected"));
}