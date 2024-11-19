import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  day: { type: String, required: true }, // Or a different data type if needed
  location: { type: String, required: true },
  price: { type: Number, required: true },
  time: { type: String, required: true }, // Or Date type for date fields
  role: { type: String, default: 'User' },
  password: { type: String, required: true },
  workExperience: [{ type: String }]
});

const User = mongoose.model('User', userSchema);
export default User;
