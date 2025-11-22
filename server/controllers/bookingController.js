import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js";


// Function to Check Availability of Room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room, 
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
        return false; // Return false on error to be safe
    }
}

// API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        
        // Validate required fields
        if(!room || !checkInDate || !checkOutDate){
            return res.json({ success: false, message: "Missing required fields" })
        }
        
        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        if(checkIn >= checkOut){
            return res.json({ success: false, message: "Check-In Date should be less than Check-Out Date" })
        }
        
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API to create a new booking
// POST /api/bookings/book

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        // Validate required fields
        if(!room || !checkInDate || !checkOutDate || !guests){
            return res.json({ success: false, message: "Missing required fields" })
        }

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        if(checkIn >= checkOut){
            return res.json({ success: false, message: "Check-In Date should be less than Check-Out Date" })
        }

        // Before Booking Check Availability 
        const isAvailable = await checkAvailability({ 
            checkInDate,
            checkOutDate,
            room,
        });

        if(!isAvailable){
            return res.json({ success: false, message: "Room is not available" })
        }
        // Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        if(!roomData){
            return res.json({ success: false, message: "Room not found" })
        }
        let totalPrice = roomData.pricePerNight;
        
        // Calculate totalPrice based on nights
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: 'Hotel Booking Details',
            html: `
                <h2>Your Booking Details</h2>
                <p>Dear ${req.user.username},</p>
                <p>Thank you for your booking! Here are your booking details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice} /night</li>
                </ul>
                <p>We look forward to welcoming you!</p>
                <p>If you need to make any changes, feel free to contact us.</p>
            `
        }
        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Booking created successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create booking" })
    }
};

// API to get all bookings for a user 
// GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        console.log('Fetching bookings for user:', user)
        
        if(!user){
            return res.json({ success: false, message: "User not found" })
        }
        
        const bookings = await Booking.find({user}).populate("room hotel").sort({ createdAt: -1 })
        console.log('Found bookings:', bookings.length)
        
        res.json({ success: true, bookings })
    } catch (error) {
        console.error('Error fetching user bookings:', error)
        res.json({ success: false, message: error.message || "Failed to fetch bookings" })  
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});
        if(!hotel){
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({ createdAt: -1 })
        // Total Bookings
        const totalBookings = bookings.length;
        // Total Revenue
        const totalRevenue = bookings.reduce((acc, booking)=>acc + booking.totalPrice, 0)
        res.json({ success: true, dashboardData: {totalBookings, totalRevenue, bookings} })
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" })
    }
}