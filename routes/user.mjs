import express from "express";
import UserController from "../controllers/user_controller.mjs";
const userRouter = express.Router();
userRouter.get("/", userController.getAllUsers);
userRouter.post("/login", userController.loginUser);

// Thêm người dùng mới
userRouter.post("/create", userController.createUser);

// Sửa thông tin người dùng
userRouter.put("/update/:id", userController.updateUser);

// Xóa người dùng
userRouter.delete("/delete/:id", userController.deleteUser);
export default userRouter;