import Booking from "../models/booking.model.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sakthivelv202222@gmail.com",
    pass: "vjrriqtisknjfucn",
  },
});

export const createBooking = async (req, res) => {
  try {
    const { userId, from, date, destination, phone, members } = req.body;

    if (!userId || !from || !date || !destination || !phone || !members) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   
    const newBooking = new Booking({ userId, from, date, destination, phone, members });
    await newBooking.save();

    const mailOptions = {
      from: "sakthivelv202222@gmail.com", 
      to: "kumarsram21813@gmail.com",
      subject: "New Booking Received",
      text: `A new booking has been made with the following details:\n\n
        Booking ID: ${newBooking._id}\n
        User ID: ${newBooking.userId}\n
        From: ${newBooking.from}\n
        Date: ${newBooking.date}\n
        Destination: ${newBooking.destination}\n
        Phone: ${newBooking.phone}\n
        Members: ${newBooking.members}\n\n
        Please check the admin panel for more details.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email not sent:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

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
