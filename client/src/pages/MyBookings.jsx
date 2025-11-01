/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Title from '../components/Title'
import {assets, userBookingsDummyData} from '../assets/assets'

const MyBookings = () => {

    const [bookings, setBookings] = useState(userBookingsDummyData)

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title title='My Bookings' subTitle='Easily manage your past, current, and
        upcoming hotel reservations in one place. Plan your trips seamlessly with
        just a few clicks' align='left' />

        <div className='max-w-6xl mt-8 w-full text-gray-800'>

            <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                <div className='w-1/3'>Hotels</div>
                <div className='w-1/3'>Date & Timings</div>
                <div className='w-1/3'>Payment</div>
            </div>

            {bookings.map((booking)=>(
                <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t gap-4 md:gap-0'>
                    {/* ------ Hotel Details ------ */}
                    <div className='flex flex-col md:flex-row md:items-start'>
                        <img src={booking.room.images[0]} alt="hotel-img" 
                        className='w-full md:w-44 h-48 md:h-32 rounded shadow object-cover' />
                        <div className='flex flex-col gap-1.5 mt-3 md:mt-0 md:ml-4'>
                            <p className='font-playfair text-2xl'>
                                {booking.hotel.name}
                                <span className='font-inter text-sm'> ({booking.room.roomType})</span>
                            </p>
                            <div className='flex items-center gap-1 text-sm text-gray-500'>
                                <img src={assets.locationIcon} alt="location-icon" />
                                <span>{booking.hotel.address}</span>
                            </div>
                            <div className='flex items-center gap-1 text-sm text-gray-500'>
                                <img src={assets.guestsIcon} alt="guests-icon" />
                                <span>Guests: {booking.guests}</span>
                            </div>
                            <p className='text-base'>Total: ${booking.totalPrice}</p>
                        </div>
                    </div>

                    {/* ------ Date & Timings ------ */}
                    <div className='flex flex-row justify-between md:flex-col md:justify-center md:items-start gap-4 md:gap-2'>
                        <div>
                            <p className='font-medium'>Check-In:</p>
                            <p className="text-gray-500 text-sm">
                                {new Date(booking.checkInDate).toDateString()}
                            </p>
                        </div>
                        <div>
                            <p className='font-medium'>Check-Out:</p>
                            <p className="text-gray-500 text-sm">
                                {new Date(booking.checkOutDate).toDateString()}
                            </p>
                        </div>
                    </div>

                    {/* ------ Payment Status ------ */}
                    <div className='flex flex-row justify-between items-center md:flex-col md:items-start md:justify-center gap-4 md:gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <p className={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                                {booking.isPaid ? "Paid" : "Unpaid"}
                            </p>
                        </div>
                        {!booking.isPaid && (
                            <button className='px-4 py-1.5 text-xs border border-gray-400
                            rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}

export default MyBookings