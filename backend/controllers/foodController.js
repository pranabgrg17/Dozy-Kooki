import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item and logic to store product data in the database
const addFood = async (req,res) =>{
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();  //this method will save food item in the database
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// all food list 
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);  //to find the food model using id
        fs.unlink(`uploads/${food.image}`,() => {})          //to delete the image from the folder

        await foodModel.findByIdAndDelete(req.body.id);    //food data will be deleted from the database
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log({success:false,message:"Error"});
        
    }
}

export {addFood,listFood,removeFood}
