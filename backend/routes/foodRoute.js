import express from "express";
import multer from "multer";
import { addFood,listFood,removeFood} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

//endpoints For add food, see the foodlist and remove food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);


export default foodRouter;
