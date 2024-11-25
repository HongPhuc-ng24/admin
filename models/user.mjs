import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  day: { type: String, required: true }, // Nếu là số, đổi thành Number
  location: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true }, // Nếu là datetime, đổi thành Date
  role: { type: String, default: 'User' },

  image: { type: String, required: false }, // Thêm trường này để lưu URL ảnh
});

const User = mongoose.model('User', userSchema);
export default User;
