import express from "express";
import HomeController from "../controllers/home_controller.mjs";

const  rootRouter = express.Router();

rootRouter.get("/about",HomeController.about);
rootRouter.get("/", HomeController.index);



export default rootRouter;