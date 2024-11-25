import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ .env
 // Nạp biến môi trường từ .env
export function connectdb(){
    mongoose.connect('mongodb+srv://nguyenhongphucms02:6XegPo0bY1SPjZR1@cluster0.kuun6.mongodb.net/demo')
.then(() => console.log('Connected!'))
.catch(err => console.error("Connection error:", err));
}
