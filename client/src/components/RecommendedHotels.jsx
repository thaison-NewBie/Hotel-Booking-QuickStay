import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const RecommendedHotels = () => {
    const {rooms, searchCities} = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = ()=>{
        // Check if rooms exists and is an array
        if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
            setRecommended([]);
            return;
        }
        
        // If searchCities exists and has items, filter by searched cities
        if (searchCities && Array.isArray(searchCities) && searchCities.length > 0) {
            const filteredHotels = rooms.filter( room => 
                room?.hotel?.city && searchCities.includes(room.hotel.city)
            );
            
            // If we found hotels matching search cities, use them
            if (filteredHotels.length > 0) {
                setRecommended(filteredHotels);
                return;
            }
        }
        
        // Otherwise, show top 4 available rooms (recommended hotels)
        // You can change this logic to show best rated, newest, etc.
        const topHotels = rooms.slice(0, 4);
        setRecommended(topHotels);
    }

    useEffect(()=>{
        filterHotels()
    },[rooms, searchCities])

    // Only show if we have rooms to display
    if (!rooms || rooms.length === 0) {
        return null;
    }

    return (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

        <Title title="Recommended Hotels" subTitle="Discover our handpicked selection of exceptional properties around the world, 
        offering unparalleled luxury and unforgettable experiences."/>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
                {recommended.slice(0,4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index}/>
                ))}
            </div>

        </div>
    )
}

export default RecommendedHotels