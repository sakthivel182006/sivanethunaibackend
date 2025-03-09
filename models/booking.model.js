import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String, required: true },
  date: { type: Date, required: true },
  destination: { type: String, required: true },
  phone: { type: String, required: true },
  members: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
