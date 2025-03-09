import Booking from "../models/booking.model.js";

/**
 * Create a new booking
 */
export const createBooking = async (req, res) => {
  try {
    const { userId, from, date, destination, phone, members } = req.body;

    // Validate required fields
    if (!userId || !from || !date || !destination || !phone || !members) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create a new booking
    const newBooking = new Booking({ userId, from, date, destination, phone, members });
    await newBooking.save();

    res.status(201).json({ success: true, message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Get all bookings for a user
 */
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Get a single booking by ID
 */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Delete a booking
 */
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
