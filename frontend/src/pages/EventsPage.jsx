import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'

const EventsPage = () => {
  const { allEvents,isLoading } = useSelector((state) => state.events); 
  return (
   <>
   {
    isLoading ? (
        <Loader />
    )   :   (
      <div>
      <Header  activeHeading={4}/>
      {allEvents.map((event) => (
         <div className=' w-11/12 mx-auto my-4'>
      <EventCard active={true} data={event} key={event.id}/>
      </div>
      ))}
  </div>
    )
   }
   </>
  )
}

export default EventsPage