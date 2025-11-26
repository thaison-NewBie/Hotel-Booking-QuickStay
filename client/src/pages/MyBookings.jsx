/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {

    const {axios, getToken, user} = useAppContext()
    const [bookings, setBookings] = useState([])

    const fetchUserBookings = async ()=>{
        try {
            const token = await getToken()
            if(!token){
                console.log('No token found')
                toast.error('Please login to view your bookings')
                setBookings([])
                return
            }
            
            const { data } = await axios.get('/api/bookings/user', {
                headers: {Authorization: `Bearer ${token}` }
            })
            
            console.log('API Response:', data)
            
            if(data.success){
                console.log('Bookings received:', data.bookings)
                setBookings(data.bookings || [])
                if(!data.bookings || data.bookings.length === 0){
                    console.log('No bookings in response')
                }
            }else{
                console.log('API returned success: false', data.message)
                toast.error(data.message || 'Failed to fetch bookings')
                setBookings([])
            }
        } catch (error) {
            console.error('Error fetching bookings:', error)
            console.error('Error response:', error.response?.data)
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch bookings')
            setBookings([])
        }
    }

    const handlePayment = async (bookingId)=>{
        try {
            const { data } = await axios.post('/api/bookings/stripe-payment', { bookingId }, 
            {headers: { Authorization: `Bearer ${await getToken()}` }})
            if(data.success){
                window.location.href = data.url
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        console.log('User state changed:', user)
        if(user){
            console.log('User is logged in, fetching bookings...')
            fetchUserBookings();
        } else {
            console.log('No user found, clearing bookings')
            setBookings([])
        }
    },[user])

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

            {bookings && bookings.length > 0 ? (
                bookings.map((booking)=>(
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
                                <button onClick={()=>handlePayment(booking._id)} 
                                className='px-4 py-1.5 text-xs border border-gray-400
                                rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                    Pay Now
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-center py-12 text-gray-500'>
                    <p>No bookings found.</p>
                </div>
            )}

        </div>
    </div>
  )
}

export default MyBookings